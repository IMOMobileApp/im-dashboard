import Input from "@mui/joy/Input";

import Textarea from "@mui/joy/Textarea";

import UploadImg from "../component/productImgUpload";

import CheckboxesTags from "../component/checkbox_select_tags";

import Button from "@mui/material/Button";

import Switch from "@mui/joy/Switch";

import Typography from "@mui/joy/Typography";

import TextEditor from "../component/textEditor";

function Categorybox() {
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="input-head">Category Title/Name</div>
        </div>

        <div className="col-md-8">
          <div className="input-field">
            <Input
              placeholder=""
              variant="soft"
              size="lg"
              style={{ padding: "12px 15px", fontSize: "15px" }}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="input-head">Category Description</div>
        </div>

        <div className="col-md-8">
          <div className="input-field">
            <Textarea
              disabled={false}
              minRows={2}
              size="lg"
              variant="soft"
              placeholder=""
              style={{ padding: "12px 15px", fontSize: "15px" }}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="input-head">Category Images</div>
        </div>

        <div className="col-md-8">
          <div
            className="input-field"
            style={{ border: "1px dashed #d5d6d7", padding: "20px" }}
          >
            <UploadImg />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="input-head">Category</div>
        </div>

        <div className="col-md-8">
          <div className="input-field">
            <CheckboxesTags style={{ width: "100%" }} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="input-head">Default Category</div>
        </div>

        <div className="col-md-8">
          <div className="input-field">
            <CheckboxesTags />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="input-head">Category Details</div>
        </div>

        <div className="col-md-8">
          <div className="input-field">
            <TextEditor />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="input-head">Published</div>
        </div>

        <div className="col-md-8">
          <div className="input-field">
            <Switch
              slotProps={{
                track: {
                  children: (
                    <>
                      <Typography
                        component="span"
                        level="inherit"
                        sx={{ ml: "10px" }}
                      >
                        {" "}
                        Yes{" "}
                      </Typography>

                      <Typography
                        component="span"
                        level="inherit"
                        sx={{ mr: "8px" }}
                      >
                        {" "}
                        No{" "}
                      </Typography>
                    </>
                  ),
                },
              }}
              sx={{
                "--Switch-thumbSize": "27px",
                "--Switch-trackWidth": "64px",
                "--Switch-trackHeight": "31px",
              }}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Button
            variant="outlined"
            color="error"
            style={{ width: "100%", fontSize: "15px", padding: "10px" }}
          >
            {" "}
            Cancel{" "}
          </Button>
        </div>

        <div className="col-md-6">
          <Button
            variant="contained"
            color="success"
            style={{ width: "100%", fontSize: "15px", padding: "10px" }}
          >
            {" "}
            Update Product{" "}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Categorybox;
