// import "./sidebar.css"
import Icon from '@mdi/react';
import { mdiHandshakeOutline  } from '@mdi/js';
import { mdiAccountMultipleOutline } from '@mdi/js';
import { mdiInformationOutline,mdiShieldCrownOutline  } from '@mdi/js';
import { UserContext } from '../../UserContext';
import React,{useState,useEffect,useContext} from "react";
import { mdiTableFurniture } from '@mdi/js';
import { mdiCashClock } from '@mdi/js';
// import logo from '../../Images/logooo.png'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

  export default function Sidebar() {
    const { SignStatus,updateSignStatus } = useContext(UserContext)

function handleLogOut(){

    


  Swal.fire({
    title: ` logout?  `,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    icon: 'warning'
}
).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

        Swal.fire(`  done `, '', 'success');
     
        // updateSignStatus("signUp")
        localStorage.setItem("SignStatus","signUp")
        localStorage.removeItem("auth");
        localStorage.removeItem("roles");
        window.location.href = 'http://localhost:3000/';
      

    } else
        Swal.fire(' Cancelled', '', 'error')

})

}


    return (
      <Card className=" min-h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-white-900/5 Sidebar bg-white sideBarDash">
        <div className="mb-2 p-4">
        <Typography className="text-[#E8AA42]" variant="h5" color="blue-gray">
        <Link to="/">
        
          </Link>
          </Typography>
        </div>
        <List>
          <Link to='/'>
          <ListItem className="hover:bg-[#babccf] hover:text-white">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <a style={{color:'black'}}> Statistics </a>
          </ListItem>
          </Link>


        

           <Link to='/ListUser'>
           <ListItem className="hover:bg-[#babccf] hover:text-white">
            <ListItemPrefix>
            <Icon path={mdiAccountMultipleOutline} size={1} />
            </ListItemPrefix>
            <a style={{color:'black'}}> Users list </a>
          </ListItem>
          </Link>

          <Link to='/Comment'>
          <ListItem className="hover:bg-[#babccf] hover:text-white">
            <ListItemPrefix>
            <Icon path={mdiHandshakeOutline } size={1} />
            </ListItemPrefix>
            <a style={{color:'black'}}>Comment's Report </a>
          </ListItem>
          </Link>

        

          <Link to='/AcceptTables'>
          <ListItem className="hover:bg-[#babccf] hover:text-white">
            <ListItemPrefix>
            <Icon path={mdiTableFurniture} size={1} />
            </ListItemPrefix>
            <a style={{color:'black'}}> Pending Posts </a>
          </ListItem>
          </Link>

           <button onClick={handleLogOut}>
           <ListItem className="hover:bg-[#babccf] hover:text-white">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <a style={{color:'black'}}> Log Out </a>
          </ListItem>
          </button>
        </List>
      </Card>
    );
  }