import React, { useRef, useState, useEffect } from "react";
import "./news.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { NewsService } from "../../apis/news";

const newItemDefault = {
  title: "",
  poster: "",
  createdWhen: "",
  shortDescription: "",
};

const News = () => {
  const [newList, setNewList] = useState([]);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogView, setOpenDialogView] = useState(false);

  const [newItem, setNewItem] = useState(newItemDefault);
  const posterRef = useRef(null);
  const [typeDialog, setTypeDialog] = useState("add");

  const getNews = async () => {
    const data = await NewsService.GetNews();

    if(data){
      setNewList(data)
    }
  }

  const onChangeNewItem = (key, value) => {
    setNewItem({
      ...newItem,
      [key]: value,
    });
  };

  const handleClickOpenDialog = (news) => {
    setOpenDialogDelete(true);
    setNewItem(news);
  };

  const handleCloseDialog = () => {
    setOpenDialogDelete(false);
    setNewItem(newItemDefault);
  };

  const handleClickOpenDialogView = (type, news) => {
    setOpenDialogView(true);
    setNewItem(news);
    setTypeDialog(type);
  };

  const handleCloseDialogView = () => {
    setOpenDialogView(false);
    setNewItem(newItemDefault);
  };

  const handleOpenPoster = () => {
    posterRef.current.click();
  };

  const handleChangePoster = (e) => {
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      if (
        file.size < 10000 ||
        file.size > 5120000 ||
        !["image/png", "image/jpg", "image/jpeg"].find((x) => x == file.type)
      ) {
        onChangeNewItem("poster", "");
      } else {
        file.preview = URL.createObjectURL(file);
        onChangeNewItem("poster", file);
      }
    } else {
      onChangeNewItem("poster", "");
    }
  };

  const handleDeleteItem = async (itemDelete) => {
    const data = await NewsService.DeleteNews(itemDelete.id);
    if(data?.message === "Delete News Successfully"){ 
      setOpenDialogDelete(false);
      toast(`Xóa thành công tin tức ${itemDelete.title}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
      });
      getNews();
    }
    else {
      toast(data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
      });
    }
  };

  const handleAddItem = async (itemAdd) => {
    const data = await NewsService.CreateNews(itemAdd);
    if(data){ 
      setOpenDialogView(false);
      toast(`Thêm thành công tin tức ${itemAdd.title}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
      });
      getNews();
    }
    else {
      toast(data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
      });
    }
  };

  const handleUpdateItem = async (itemUpdate) => {
    const body = {
      ...itemUpdate,
      newsId: itemUpdate?.id
    }
    const data = await NewsService.UpdateNews(body);
    console.log(data, itemUpdate);
    if(data){ 
      toast(`Cập nhật thành công tin tức ${itemUpdate.title}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
      });
      setOpenDialogView(false);
      getNews();
    }
    else {
      toast(data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
      });
    }
    
  };

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const formatCreateWhen = (date) => {
    const currentDate = new Date(date);
    return  [
        currentDate.getDate(),
        currentDate.getMonth() + 1,
        currentDate.getFullYear(),
      ].join("/") +
      " " +
      [
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
      ].join(":");
  }


  useEffect(() => {
    getNews();
  }, [])

  return (
    <div className="h-full min-h-screen flex flex-col p-10 w-full">
      <div className="flex items-center justify-end mb-10">
        <Button
          variant="outlined"
          startIcon={<BiPlusCircle />}
          color="warning"
          style={{ fontWeight: "bold" }}
          onClick={() =>
            handleClickOpenDialogView("add", {
              ...newItemDefault,
            })
          }
        >
          Thêm tin tức
        </Button>
      </div>
      <DataTable
        value={newList}
        responsiveLayout="scroll"
        className="w-full"
      >
        <Column
          field="title"
          header="Tiêu đề"
          body={(data) => {
            return <p>{truncateString(data?.title, 30)}</p>;
          }}
        ></Column>
        <Column field="createdWhen" header="Ngày tạo"
          body={(data) => {
            return (
              <span>{formatCreateWhen(data?.createdWhen)}</span>
            );
          }}
        ></Column>
        <Column
          field="poster"
          header="Poster"
          body={(data) => {
            return (
              <img
                src={data.poster}
                alt=""
                className="w-[200px] h-[80px] object-cover"
              />
            );
          }}
        ></Column>
        <Column
          field="shortDescription"
          header="Miêu tả"
          body={(data) => {
            return (
              <div className="flex flex-row gap-4 items-center">
                <span className="flex flex-2">
                  {truncateString(data?.shortDescription, 60)}
                </span>
                <div className="flex flex-1 flex-row gap-4 items-center justify-end">
                  <MdDeleteForever
                    id="button-delete"
                    size={30}
                    className="text-red-500"
                    onClick={() => handleClickOpenDialog(data)}
                  />
                  <FaEye
                    size={30}
                    className="text-blue-500"
                    onClick={() =>
                      handleClickOpenDialogView("view", {
                        ...data,
                      })
                    }
                  />
                </div>
              </div>
            );
          }}
        ></Column>
      </DataTable>

      {/* Dialog delete */}
      <Dialog
        open={openDialogDelete}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{
            fontWeight: "bold",
          }}
        >{`Bạn có muốn xóa tin tức ${newItem?.title}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {newItem?.shortDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={{ color: "gray" }}>
            Hủy
          </Button>
          <Button
            onClick={() => handleDeleteItem(newItem)}
            style={{ color: "red" }}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

      {/* View or Add  */}
      <Dialog
        open={openDialogView}
        keepMounted
        onClose={handleCloseDialogView}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {typeDialog === "add" ? "Thêm tin tức" : "Chi tiết"}
        </DialogTitle>
        <div className="py-10 px-4 gap-4 flex flex-col w-[500px]">
          <TextField
            required
            id="outlined-required"
            label="Tiêu đề"
            value={newItem?.title}
            multiline
            onChange={(e) => onChangeNewItem("title", e.target.value)}
          />
          <TextField
            required
            value={newItem?.shortDescription}
            id="outlined-required"
            label="Miêu tả"
            multiline
            onChange={(e) =>
              onChangeNewItem("shortDescription", e.target.value)
            }
          />
          <TextField
            required
            value={newItem?.poster}
            id="outlined-required"
            label="Poster"
            multiline
            onChange={(e) => onChangeNewItem("poster", e.target.value)}
          />
          {!!newItem?.poster && (
              <img
                src={newItem?.poster}
                alt="poster"
                className="w-full h-[200px] object-cover"
              />
            )}
        </div>
        <DialogActions>
          <Button onClick={handleCloseDialogView} style={{ color: "gray" }}>
            Hủy
          </Button>
          <Button
            onClick={() => {
              typeDialog === "add"
                ? handleAddItem(newItem)
                : handleUpdateItem(newItem);
            }}
            style={{ color: "red" }}
          >
            {typeDialog === "add" ? "Thêm" : "Cập nhật"}
          </Button>
        </DialogActions>
      </Dialog>
      {/*  */}
    </div>
  );
};

export default News;
