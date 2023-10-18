"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button className="cursor-pointer" color="ruby">
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>
          Confirm Delete
        </AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure to delete this Issue. This action cannot be undone.
        </AlertDialog.Description>
         <Flex className="mt-4" gap="5">
          <AlertDialog.Cancel>
             <Button variant="soft" color="gray">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Delete</Button>
          </AlertDialog.Action>
           
         </Flex>
       
       
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
