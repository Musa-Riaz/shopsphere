import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from '@/components/ui/progress';
import { Textarea } from "@/components/ui/textarea";
export default function Home() {
  return (
    <div className="p-4 ">
    <Input placeholder="enter somethni" className="m-4" />
    <Button  className="m-4" variant={"elevated"}>Hello</Button>
    <Progress  className="m-4" value={50} />
    <Textarea  className="m-4"> Hello</Textarea>
    </div>
  );
}
