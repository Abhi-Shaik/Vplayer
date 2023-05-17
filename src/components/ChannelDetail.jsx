import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Box} from '@mui/material'; 
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";
import { fetchFromAPI } from '../utils/fetchFromAPI';
const ChannelDetail = () => {
  const {id} =useParams();
  const [channelDetail, setchannelDetail] = useState(null)
  const [videos, setvideos] = useState([])
  // console.log(channelDetail,videos);
  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data)=>setchannelDetail(data?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data)=>setvideos(data?.items));
  },[id]);
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(90deg, rgba(7,24,71,1) 0%, rgba(11,9,121,1) 51%, rgba(0,219,255,0.9977240896358543) 100%)',
          zindex: 10,
          height: '300px'
        }}>
        </div>
        <ChannelCard channelDetail={channelDetail}
        marginTop="-110px"  />
      </Box>
      <Box display="flex" p="2" >
        <Box sx={{mr: { sm : '100px'}}}/> 
            <Videos videos={videos}/>
      </Box>
    </Box>
  )
}
export default ChannelDetail;