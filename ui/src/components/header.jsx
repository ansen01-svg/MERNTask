// import Button from "@mui/material/Button";

export default function Header() {
  return (
    <div className="w-full px-4 py-4 flex items-center justify-between md:px-6 lg:px-10">
      <div>
        <p className="text-[22px]">Email Scheduler</p>
      </div>
      <div>
        {/* <Button
          variant="contained"
          size="small"
          sx={{ font: "14px", minWidth: "74px", textTransform: "none" }}
        >
          Save
        </Button> */}
      </div>
    </div>
  );
}
