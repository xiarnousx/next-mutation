"use server";
import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prev, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  const errors = [];
  if (!title || title.trim() === "") {
    errors.push("Title is required");
  }

  if (!content || content.trim() === "") {
    errors.push("Content is required");
  }

  if (!image || image.length === 0) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }
  try {
    const imageUrl = "https://placehold.co/600x400"; //await uploadImage(image);
    await storePost({
      imageUrl,
      title,
      content,
      userId: 1,
    });
  } catch (error) {
    throw new Error("Image upload faild");
  }
  revalidatePath("/feed");
  redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/feed");
}
