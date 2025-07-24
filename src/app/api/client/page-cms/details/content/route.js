import dbConnect from "@/lib/db/dbConnect";
import PageCMSModel from "@/model/cms/PageCMS";
import PageCMSTranslationModel from "@/model/cms/PageCMSTranslation";
import FilesModel from "@/model/Files";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    const linkId = searchParams.get("linkId");
    const lang = searchParams.get("lang");

    // Check invalid inputs
    if (!linkId || !lang) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Get cms page details
    const cmsPageDetails = await PageCMSModel.findOne({ linkId })
      .select("_id metaTitle metaImage metaKeywords metaDescription")
      .populate({
        path: "metaImage",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .exec();
    if (!cmsPageDetails) {
      return errorResponse({
        message: "CMS Page not found.",
        status: 404,
      });
    }

    // Fetch English ('en') content as the base reference
    const cmsContentEn = await PageCMSTranslationModel.findOne({
      referenceId: cmsPageDetails._id.toString(),
      lang: "en",
    })
      .select("pageName description content updatedAt")
      .exec();

    // Parse English content
    const enContent = cmsContentEn?.content
      ? JSON.parse(cmsContentEn.content)
      : {};

    // If lang is "en", return content directly
    if (lang === "en") {
      return successResponse({
        status: 200,
        contentData: enContent,
        otherInfo: {
          pageName: cmsContentEn?.pageName || "",
          pageDescription: cmsContentEn?.description || "",
          pageLastUpdatedAt: cmsContentEn?.updatedAt || "",
          pageMetaTitle: cmsPageDetails?.metaTitle || "",
          pageMetaImage: cmsPageDetails?.metaImage || {},
          pageMetaKeywords: cmsPageDetails?.metaKeywords || "",
          pageMetaDescription: cmsPageDetails?.metaDescription || "",
        },
      });
    }

    // Fetch current requested language content
    const cmsContentData = await PageCMSTranslationModel.findOne({
      referenceId: cmsPageDetails._id.toString(),
      lang,
    })
      .select("pageName description content updatedAt")
      .exec();

    // Parse the requested language content
    const langContent = cmsContentData?.content
      ? JSON.parse(cmsContentData.content)
      : {};

    // Merge content: Keep langContent values, but fill missing ones from enContent
    const mergedContent = Object.keys(enContent).reduce((acc, key) => {
      acc[key] = langContent.hasOwnProperty(key)
        ? langContent[key]
        : enContent[key];
      return acc;
    }, {});

    return successResponse({
      status: 200,
      contentData: mergedContent,
      otherInfo: {
        pageName: cmsContentData?.pageName || "",
        pageDescription: cmsContentData?.description || "",
        pageLastUpdatedAt: cmsContentData?.updatedAt || "",
        pageMetaTitle: cmsPageDetails?.metaTitle || "",
        pageMetaImage: cmsPageDetails?.metaImage || {},
        pageMetaKeywords: cmsPageDetails?.metaKeywords || "",
        pageMetaDescription: cmsPageDetails?.metaDescription || "",
      },
    });
  } catch (error) {
    console.log(`Error in getting cms page content details SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
