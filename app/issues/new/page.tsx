"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextArea, TextField } from "@radix-ui/themes"
import { Controller, useForm } from "react-hook-form";
import { data } from "autoprefixer";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
   title: string;
   description: string;
}

const NewIssuePage = () => {

  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const postData = async ( data: IssueForm ) => { 
    
    console.log("Posting the form data : ", data);
     await axios.post("/api/issues", data);
     router.push("/issues");
  }

  return (
    <form className="max-w-xl space-y-5" onSubmit={ handleSubmit( data => postData( data ))}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller 
       name="description"
       control={control}
       render={ ({ field }) => <SimpleMDE placeholder="Description" {...field}/>}
      />
      <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage