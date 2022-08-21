import React from 'react'
import {Stack, SimpleGrid,Box,Text,Grid,Flex,HStack,VStack,Center,GridItem,Heading } from '@chakra-ui/react'


const Layout2 = () => {
  return (
 
     <Grid
  h='400px'
  templateRows='repeat(3, 1fr)'
  templateColumns='repeat(3, 1fr)'
  gap={4}
  margin="94px"
  border="1px solid red"

>
  <GridItem rowSpan={2} colSpan={2}  bg='violet' />
  <GridItem  bg='tomato' rowSpan={3} />
  <GridItem colSpan={2} bg='lightblue' />
 
</Grid>
  
  )
}

export default Layout2
