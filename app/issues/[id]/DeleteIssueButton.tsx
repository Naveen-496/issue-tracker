"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleDelete() {
    try {
     
      const result = await axios.delete("/api/issues/" + issueId);
      toast.success(result.statusText);
      setTimeout(() => {
        router.push("/issues");
        router.refresh();
      }, 2000);
    } catch (error: any) {
      // toast.error(error.message);
      setError(error.message);
    }
  }

  return (
    <>
      <Toaster richColors />
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button className="cursor-pointer" color="ruby">
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure to delete this Issue. This action cannot be undone.
          </AlertDialog.Description>
          <Flex className="mt-4" gap="5">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error ? true : false}>
        <AlertDialog.Content>
          <AlertDialog.Title color="red">Error</AlertDialog.Title>
          <AlertDialog.Description>{error}</AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError("")}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
