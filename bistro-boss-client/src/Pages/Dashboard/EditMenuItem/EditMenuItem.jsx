import { useParams } from "react-router-dom";
import EditMenu from "../../../Components/EditMenu/EditMenu";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";

const EditMenuItem = () => {
    const {isUpdateMenuSuccess,isUpdateMenuLoading} = useSelector(state=>state.menu)
    const params = useParams()

    useEffect(()=>{
        if(isUpdateMenuSuccess) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Menu I',
                showConfirmButton: false,
                timer: 2000
              })
        }
        if(isUpdateMenuLoading) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Update Failed',
                showConfirmButton: false,
                timer: 2000
              })
        }
    },[isUpdateMenuLoading, isUpdateMenuSuccess])

    return (
        <div>
            <h1 className="text-center text-4xl font-semibold my-7">UPDATE ITEM</h1>
            <EditMenu id={params.id}/>
        </div>
    );
};

export default EditMenuItem;