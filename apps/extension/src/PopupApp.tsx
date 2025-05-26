import { Button } from "./components/ui/button";

export default function PopupApp() {
  // hi Revo,   i am just testing somethings out here 

  return (
    <div className="p-4 space-y-4 font-sans w-[300px]">
      <h1 className="text-lg font-bold">HelpMeOut</h1>

      <Button variant="outline" className="text-white" >
        Start Recording
      </Button>
    </div>
  );
}
