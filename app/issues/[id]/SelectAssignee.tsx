"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster, toast } from "sonner";

{
  /* 

 const [users, setUsers] = useState<User[]>([]);
      useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };

    fetchUsers();
  }, []);
*/
}

const SelectAssignee = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const handleSelectChange = async (userId: string) => {
    axios.patch("/api/issues/" + issue.id, { assignedToUserId: userId === "unassigned" ? null: userId}).catch( err => toast.error( err.message));
  };

  return (
    <>
    <Toaster richColors />
    <Select.Root 
    defaultValue={ issue.assignedToUserId || "unassigned"}
    onValueChange={(userId) => handleSelectChange(userId)}
    >
      <Select.Trigger placeholder="Assignee..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
    </>
  );
};

const useUsers = () => useQuery<User[]>({
  queryKey: ["users"],
  queryFn: () => axios.get("/api/users").then((res) => res.data),
  staleTime: 60 * 1000, // 60 secs
  retry: 3,
});

export default SelectAssignee;
