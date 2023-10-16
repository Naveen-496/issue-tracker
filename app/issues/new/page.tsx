"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextArea, TextField } from "@radix-ui/themes"
const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button type="submit" className="cursor-pointer">Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage