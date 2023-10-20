"use client";
import { issueSchema } from "@/app/validationSchema";
import { ErrorMessage, Spinner } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { z } from "zod";

import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const postData = async (data: IssueFormData) => {
    try {
      console.log("Posting the form data : ", data);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
        toast.success("Issue updated successfully");
      } else {
        await axios.post("/api/issues", data);
        toast.success("New Issue created successfully");
      }

      setTimeout(() => {
        router.push("/issues/list");
        router.refresh();
      }, 2000);
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-5"
        onSubmit={handleSubmit((data) => postData(data))}
      >
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {isSubmitting && <Spinner />}{" "}
          {issue ? "Update Issue" : "Submit New Issue"}
        </Button>
      </form>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default IssueForm;
