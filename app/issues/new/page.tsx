"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { data } from "autoprefixer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchea";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";

type IssueForm = z.infer< typeof createIssueSchema>;


const NewIssuePage = () => {
  const { register, control, handleSubmit, formState: { errors} } = useForm<IssueForm>({
    resolver: zodResolver( createIssueSchema)
  });
  const router = useRouter();
  const [ error, setError ] = useState("");

  const postData = async (data: IssueForm) => {
    try {
      console.log("Posting the form data : ", data);
      await axios.post("/api/issues", data);
      toast.success("New Issue created successfully");
      setTimeout(() => {
         router.push("/issues");
      }, 2000);
     
    } catch (error: any) {
      setError( error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-xl">
    { error && <Callout.Root className="mb-5" color="red">
       <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form
        className="space-y-5"
        onSubmit={handleSubmit((data) => postData(data))}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage children={ errors.title?.message} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />         
          )}
        />
        <ErrorMessage children={ errors.description?.message} />
        <Button>Submit New Issue</Button>
      </form>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default NewIssuePage;