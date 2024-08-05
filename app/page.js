'use client'
import Image from "next/image";
import { useState, useEffect } from 'react'
import { firestore } from "@/firebase"
import { Box, Typography, Modal, Stack, TextField, Button, Menu } from '@mui/material'
import { collection, query, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
import './styles.css'

export default function Home() {
  
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [itemSearch, setItemSearch] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })     
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity+1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      if(quantity===1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity: quantity-1})
      }
    }

    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [itemSearch])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  

  return (
    <>
      <Box
        width="80%"
        height="100px"
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        zIndex={-3}
        marginTop={3}
        marginLeft="10%"
        padding= "20px"
        gap= "10px"
        sx={{
          borderRadius: 10,
          bgcolor:"#ffcbcb",
          transition: "background-color .5s ease", // Add transition property
          '&:hover': {
            bgcolor:"#ffb5b5",
          }
        }}
      >
        <Typography variant="h6">Search</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField 
                variant="outlined"
                fullWidth
                value={itemSearch}
                onChange={(e) => {
                  setItemSearch(e.target.value)
                }}
                ></TextField>
              <Button
                variant="outlined"
                onClick={() => {
                  setItemSearch('')
                }}
                >SEARCH</Button>
            </Stack>
      </Box>
      <Box 
        width="100vw" 
        height="80vh" 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        gap={2}
        >
        <Modal
          open={open}
          onClose={handleClose}
          >
          <Box
            position="relative"
            top="50%"
            left="50%"
            width={400}
            bgcolor="white"
            border="2px solid #000"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{
              transform: "translate(-50%, -50%)",
            }}
            >
            <Typography variant="h6">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField 
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value)
                }}
                ></TextField>
              <Button
                variant="outlined"
                onClick={() => {
                  addItem(itemName)
                  setItemName('')
                  handleClose()
                }}
                >ADD</Button>
            </Stack>
          </Box>
        </Modal>
        <Button
          variant="contained"
          onClick={() => {
            handleOpen()
          }}
          >
          Add New Item
        </Button>
        <Box
          border='3px solid #fff'
          borderRadius={10}
          padding={5}
          gap={2}
          >
          <Box
            width="1000px"
            height="auto"
            bgcolor="#407088"
            alignItems="center"
            justifyContent="center"
            display="flex"
            borderRadius={10}

            >
            <Typography
              variant="h2"
              color="#fff"
              padding="10px"
              >Inventory Items
            </Typography>
          </Box>
        {/* <Typography variant="h1">Inventory Management</Typography> */}

        <Stack 
          width="800px" 
          height="auto" 
          spacing={2} 
          overflow="clip" 
          padding="10px"
          display="flex"
          gap="10px"
          flexDirection="row">
          {
            inventory.map(({name, quantity}) => {
              if(name.includes(itemSearch)) {
                return (
                  <Box key={name} 
                  width="400px" 
                  height="400px" 
                  display="flex" 
                  flexDirection="column"
                  alignItems="center" 
                  justifyContent="space-between" 
                  bgcolor="#f0f0f0"                   
                  borderRadius={4}
                  padding={5}>
                      <Typography 
                        variant="h3"
                        color="#333"
                        textAlign="center"
                        >{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
                      <Typography 
                        variant="h3"
                        color="#333"
                        textAlign="center"
                        >{quantity}</Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          addItem(name)
                        }}
                        >Add</Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          removeItem(name)
                        }}
                        >Remove
                      </Button>
                  </Box>
                )
              }
            })}
          </Stack>
        </Box>
      </Box>
    </>
  );
}

//       {/* {inventory.forEach((item) => {
  // return(
    //   <Box>
    //     {item.name}
    //     {item.count}
    //   </Box>
    // )
    // })} */}