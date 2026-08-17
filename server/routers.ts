import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createStudyMaterial, deleteStudyMaterial, listStudyMaterials } from "./db";
import { isValidStudyFile, MAX_STUDY_FILE_BYTES, safeStudyFileName, studyMaterialCategories } from "./materials";
import { storagePut } from "./storage";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  materials: router({
    list: protectedProcedure.query(({ ctx }) => listStudyMaterials(ctx.user.id)),
    upload: protectedProcedure.input(z.object({
      fileName: z.string().min(1).max(255),
      mimeType: z.string().min(1).max(160),
      sizeBytes: z.number().int().positive().max(MAX_STUDY_FILE_BYTES),
      base64: z.string().min(1).max(Math.ceil(MAX_STUDY_FILE_BYTES * 1.38)),
      category: z.enum(studyMaterialCategories),
      subject: z.string().max(80).optional(),
    })).mutation(async ({ ctx, input }) => {
      if (!isValidStudyFile(input.fileName, input.mimeType)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Use PDF, image, text, DOC or DOCX study material only." });
      }
      const content = Buffer.from(input.base64, "base64");
      if (content.byteLength !== input.sizeBytes || content.byteLength > MAX_STUDY_FILE_BYTES) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "The file could not be verified or is over the 5 MB limit." });
      }
      const fileName = safeStudyFileName(input.fileName);
      const stored = await storagePut(`study-materials/${ctx.user.id}/${Date.now()}-${fileName}`, content, input.mimeType);
      const material = await createStudyMaterial({
        userId: ctx.user.id,
        fileKey: stored.key,
        url: stored.url,
        fileName,
        mimeType: input.mimeType,
        category: input.category,
        subject: input.subject || null,
        sizeBytes: content.byteLength,
      });
      return material;
    }),
    delete: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
      const deleted = await deleteStudyMaterial(ctx.user.id, input.id);
      if (!deleted) throw new TRPCError({ code: "NOT_FOUND", message: "Study material not found." });
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
