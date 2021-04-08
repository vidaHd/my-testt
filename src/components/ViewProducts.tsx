import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "../../src/App.css";
import EditModalFunction from "./EditeModal";
import _ from "lodash";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

interface Iclases {
  modal?: string;
  table?: string;
  root: string;
  btn: string;
  forms: string;
  paper?: string;
  button?: string;
  inp?: string;
  roots?: string;
  btnD?: string;
}

interface IrowItem {
  id: number;
  name: string;
  description: string;
  price?: number | undefined | null;
  checked?: any;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    flexGrow: 1,
    marginTop: 200,
    width: "50%",
    margin: "auto",
    borderCollapse: "collapse",
    border: "0.1px solid gray",
  },
  roots: {
    width: "20%",
    margin: "auto",
    marginTop: 50,
    overflowY: "scroll",
    minHeight: 100,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
  },
  btn: {
    marginTop: 70,
    position: "absolute",
    left: "45%",
  },
  btnD: {
    marginTop: 130,
    position: "absolute",
    left: "45.5%",
  },
  forms: {
    padding: 50,
    display: "flex",
    justifyContent: "space-between",
    marginTop: "3%",
  },
  inp: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    margin: "auto",
  },
}));

export const View = (props): JSX.Element => {
  const classes: Iclases = useStyles();

  const [showEditModal, setShowEditModal] = useState(false);

  const [checked, setChecked] = useState();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | null>();

  const [formData, setFormData] = useState<IrowItem[]>([]);
  const [rowinfo, setRowinfo] = useState<any | null>();

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const focusbtn = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const SaveData: any = localStorage.getItem("formData");
    let objJson = JSON.parse(SaveData);

    if (objJson === undefined) {
      objJson = [];
    }
    if (objJson === null) {
      objJson = [];
    }
    //اظافه شدن ای دی
    for (let i = 0; i < objJson.length; i++) {
      objJson[i].id = i;
      const tests = _.get(objJson, [i, "id"], []);
      console.log(tests);
    }

    setFormData(objJson);
  }, []);

  useEffect(() => {
    if (nameRef.current && nameRef.current.focus) {
      nameRef.current.focus();
    }
  }, []);

  function FocusName(e) {
    if (e.keyCode === 13 && priceRef.current && priceRef.current.focus) {
      priceRef.current.focus();
    }
  }

  function FocusPrice(e) {
    if (
      e.keyCode === 13 &&
      descriptionRef.current &&
      descriptionRef.current.focus
    ) {
      descriptionRef.current.focus();
    }
  }

  function FocusRepetPassword(e) {
    if (e.keyCode === 13 && focusbtn.current && focusbtn.current.focus) {
      focusbtn.current.focus();
    }
  }

  const handleChangeName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handelChangeDescription = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handelChangePrice = (e) => {
    const value = e.target.value;
    setPrice(value);
  };

  const handleOpenEditModal = (rowId) => {
    const rowData: any | null = formData.filter((x) => x.id == rowId);

    setRowinfo(rowData[0]);

    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const updateformData = (editedData) => {
    const newdata = formData.map((x) => {
      if (editedData.id === x.id) {
        x.name = editedData.name;
        x.description = editedData.description;
        x.price = editedData.price;
      }
      return x;
    });

    setShowEditModal(false);
    setFormData(newdata);
    const JsonNewFormEditData = JSON.stringify(newdata);
    localStorage.setItem("formData", JsonNewFormEditData);
  };

  const Validate = () => {
    if (!name) {
      alert("فیلد نام نباید خالی باشد");
      return false;
    } else if (!description) {
      alert("فیلد توضیحات نباید خالی باشد");
      return false;
    } else if (!price) {
      alert("فیلد  قیمت نباید خالی باشد");
      return false;
    } else if (isNaN(price)) {
      alert("فیلد قیمت نباید حروف باشد");
      return false;
    } else {
      return true;
    }
  };

  function handleRemoveItem(idShouldDelet): void {
    const results: IrowItem[] = formData.filter((x) => x.id != idShouldDelet);

    setFormData(results);
    const JsonResult = JSON.stringify(results);
    localStorage.setItem("formData", JsonResult);
  }

  function addOrder() {
    if (Validate()) {
      let information;

      if (formData.length === 0) {
        information = {
          id: 0,
          name: name,
          description: description,
          price: price,
          checked: checked,
        };
      } else {
        const LastId = formData[formData.length - 1].id;

        information = {
          id: LastId + 1,
          name: name,
          description: description,
          price: price,
          checked: checked,
        };
      }

      const newformdata = formData;
      newformdata.push(information);
      setFormData(newformdata);

      const JsonNewFormData = JSON.stringify(newformdata);
      localStorage.setItem("formData", JsonNewFormData);

      setName("");
      setDescription("");
      setPrice(null);
    }
  }

  const DeleteAll = () => {
    return;
  };

  function handelerSelected(id) {
    return;
  }

  return (
    <>
      {showEditModal && (
        <EditModalFunction
          openEditModal={showEditModal}
          CloseEditModal={handleCloseEditModal}
          Data={rowinfo}
          update={updateformData}
        />
      )}

      <div id="form">
        <form
          className={classes.forms}
          noValidate
          autoComplete="off"
          style={{ display: "flex" }}
        >
          <TextField
            type="text"
            id="inputName"
            label="name"
            onChange={handleChangeName}
            value={name}
            inputRef={nameRef}
            onKeyDown={FocusName}
          />
          <TextField
            id="inputDescription"
            label="description"
            onChange={handelChangeDescription}
            value={description}
            onKeyDown={FocusPrice}
            inputRef={priceRef}
          />
          <TextField
            id="inputPrice"
            label="price"
            onChange={handelChangePrice}
            value={price ? price : ""}
            onKeyDown={FocusRepetPassword}
            inputRef={descriptionRef}
          />
        </form>

        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={addOrder}
          innerRef={focusbtn}
          id="btnAdd"
        >
          send order
        </Button>

        <Button
          className={classes.btnD}
          variant="contained"
          color="secondary"
          onClick={DeleteAll}
          id="btnAdd"
        >
          delet All
        </Button>
        <TableContainer className={classes.root} component={Paper}>
          <Table
            className={classes.table}
            aria-label="caption table"
            id="table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right">
                  <Checkbox />
                </TableCell>
                <TableCell align="right">Edt</TableCell>
                <TableCell align="right">Delete</TableCell>
                <TableCell align="right">#</TableCell>
                <TableCell align="right">id</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right">description</TableCell>
                <TableCell align="right">price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.map((row: IrowItem, index: number) => (
                <TableRow>
                  <TableCell align="right">
                    <Checkbox onClick={() => handelerSelected(row.id)} />
                  </TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      className={classes.button}
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenEditModal(row.id)}
                      data-test-btn-edit={row.id}
                    ></Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemoveItem(row.id)}
                      data-test-btn-delete={row.id}
                    ></Button>
                  </TableCell>
                  <TableCell align="right">{index}</TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right" data-test-input-name={row.name}>
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Card className={classes.roots}>
          <CardContent>
            <Typography color="textSecondary">Information</Typography>
            {formData.map((a) => (
              <Typography>
                {a.name + " - " + a.description + " - " + a.price}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
