/* eslint-disable */
import { Container, Row, Col, ListGroup, Button,FormControl,InputGroup } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { Email } from '@mui/icons-material';
import langarr from '../../../component/user/Langarr'
import langkey from '../../../component/user/Lang'
import langIMG from '../../../component/user/LangImg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import User from '..';
import Avatar from '@mui/material/Avatar';


export default function UserDetail() {
  const router = useRouter();
  const {email} = router.query
  // 아..! 이메일이라는 변수로 넘어오잖아. 헠..! 그래서 이변수 그대로써야함
  const [remail,setRemail] = useState<any>(email)
  // const [email,setEmail] = useState<any>(email2)
  // useEffect(()=>{
  //   setEmail(email2)
  // },[])
  // const [email,setEmail] = useState<any>(router.query)
  const [user,setUser] = useState<any>()
  const [userRating,setUserRating] = useState<any>()
  const [lang,setLang] = useState<any>([])
  // 유저 코멘트
  const [comment,setComment] = useState('')
  const [cmtarr,setCmtarr] = useState<any>()
  const [cmtChange,setCmtChange] = useState(false)

  // 기억하자..배열 사용할때 any!
  const larr:any = langarr
  const lkey:any = langkey
  const lImg:any = langIMG

  // 학습언어
  const [langa,setLangA] = useState([])
  // 구사언어
  const [langb,setLangB] = useState([])
  // 모국어
  const [langc,setLangC] = useState([])

  // 코멘트
  const getComment = () => {
    axios({
      url: `https://blahblah.community:8443/api/review/${remail}`,
      method: "get",
    }).then((res) => {
      console.log('댓글 목록 요청성공')
      console.log(res.data)
      setCmtarr(res.data)
    }).catch((err)=>{
      console.log('댓글 목록 요청실패')
      console.log(err)
    });
  };
  const handleComment = (event: any) => {
    //event.preventDefault();
    setComment(event.target.value);
  };
  useEffect(()=>{
    getComment()
  },[remail])

  // const onWriteComment = ()=>{
  //   console.log(comment)
  // }
  const WriteComment = (event:any) => {
    event.preventDefault();
    setCmtChange(!cmtChange)
    // setComment()
    axios({
      method:'post',
      url:`https://blahblah.community:8443/api/review/${remail}`,
      headers: setToken(),
      data: {
        'reviewTxt':comment
      },
    })
    .then((result)=>{
    console.log('댓글 요청성공')
    console.log(result)
    getComment()
    // 실시간 갱신위함
 
  })
    .catch((error)=>{
      console.log('댓글 요청실패')
      console.log(error)  
  })
  };

  const UpdateComment = (event:any) => {
    event.preventDefault();
    setCmtChange(!cmtChange)
    // setComment()
    axios({
      method:'put',
      url:`https://blahblah.community:8443/api/review/${remail}`,
      headers: setToken(),
      data: {
        'reviewTxt':comment
      },
    })
    .then((result)=>{
    console.log('댓글 수정요청성공')
    console.log(result)
    getComment()
    // 실시간 갱신 위함
 
  })
    .catch((error)=>{
      console.log('댓글 수정요청실패')
      console.log(error)  
  })
  };

  const DeleteComment = (event:any) => {
    event.preventDefault();
    axios({
      method:'delete',
      url:`https://blahblah.community:8443/api/review/${remail}`,
      headers: setToken(),
    })
    .then((result)=>{
    console.log('댓글 삭제요청성공')
    console.log(result)
    getComment()
    // 실시간 갱신위함
 
  })
    .catch((error)=>{
      console.log('댓글 삭제요청실패')
      console.log(error)  
  })
  };

  // 로그인한 사용자 정보
  const [me,setMe] = useState<any>()
  const getProfile = () => {
    axios({
      url: "https://blahblah.community:8443/api/user/me",
      method: "get",
      headers: setToken(),
    }).then((res) => {
      // console.log(res)
      // console.log(res.body)
      console.log(res.data)
      setMe(res.data)
    });
  };
  

  const onEmailCheck = () => {
    axios({
      method:'get',
      url:`https://blahblah.community:8443/api/user/${remail}`,
    })
    .then((result)=>{
     console.log('이메일로정보 요청성공')
     console.log(result.data)
     setUser(result.data)
     setUserRating(result.data['rating'])
     setLang(result.data['langInfos'])
     console.log(result.data['langInfos'])
  })
    .catch((error)=>{
      console.log('이메일로정보 요청실패')
    console.log(error)  
  })
  };

  // 페이지 넘어오자마자 이메일 인증체크!
  useEffect(() => {
    onEmailCheck()
    getProfile()
    // getComment()
  }, [remail]);

  useEffect(()=>{
    if(lang.length!==0){
      console.log('됫다!')
      // var newarr:any = [...langa]
      var newarra:any = [...langa]
      var newarrb:any  = [...langb]
      var newarrc:any  = [...langc]


      for(let i=0;i<Object.keys(lang).length;i++){

        if(lang[i]['level']===1 ||lang[i]['level']===2 || lang[i]['level']===3){
          // var newarr:any = [...langa]
          newarra.push(lang[i]['langId'])
          setLangA(newarra)
        }else if(lang[i]['level']===4){
          newarrb.push(lang[i]['langId'])
          setLangB(newarrb)
        }
        else if(lang[i]['level']===5){
          // any형식의 인수는never형식에 할당할 수없음, 배열도any로 설정
          newarrc.push(lang[i]['langId'])
          setLangC(newarrc)
        }
      }
    }
  },[lang])

    // 유저 좋아요 버튼
    const [likeBtn,setLikeBtn] = useState(true)
    // 유저 팔로우 버튼
    const [followBtn,setFollowBtn] = useState(true)
    

  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  // 팔로우요청,언팔로우요청
  const userFollow = (event:any) => {
    event.preventDefault();
    setFollowBtn(!followBtn)
    axios({
      method:'post',
      url:`https://blahblah.community:8443/api/follow/${user.id}`,
      headers: setToken(),
      // data: {
      //   'email':email
      // },
    })
    .then((result)=>{
    console.log('팔로우 요청성공')
    console.log(result)
 
  })
    .catch((error)=>{
      console.log('팔로우 요청실패')
      console.log(error)  
  })
  };

  // 좋아요 요청
  const userLike = (event:any) => {
    event.preventDefault();
    setLikeBtn(!likeBtn)
    // 임시로 보여주는 좋아요 갱신
    if(likeBtn===false){
      setUserRating(userRating-1)
    }else{
      setUserRating(userRating+1)

    }
    // onEmailCheck()
    axios({
      method:'post',
      url:`https://blahblah.community:8443/api/rate/${remail}`,
      headers: setToken(),
      data: {
        'email':remail
      },
    })
    .then((result)=>{
      // setLikeBtn(!likeBtn)
      // props.findMate()
      // 이걸로 상위 함수 바꿔줘서 좋아요 실시간
      // setLike(props.user.rating)
      console.log('유저 좋아 요청성공')
    console.log(result)
 
  })
    .catch((error)=>{
      console.log('유저 좋아 요청실패')
      console.log(email)
    console.log(error)  
  })
  };

  const [following,setFollowing] = useState<any>()
  const [rateList,setRateList] = useState<any>()
  const getFollowing = () => {
    axios({
      url: "https://blahblah.community:8443/api/follow/following",
      method: "get",
      headers: setToken(),
    }).then((res) => {
      console.log('팔로잉 목록 요청성공')
      // console.log(res)
      console.log(res.data)
      setFollowing(res.data)
      // setFollowing(res.data)
    }).catch((err)=>{
      console.log('팔로잉 목록 요청실패')
      console.log(err)
    });
  };

  const getRateList = () => {
    axios({
      url: "https://blahblah.community:8443/api/rate/ratedlist",
      method: "get",
      headers: setToken(),
    }).then((res) => {
      console.log('좋아요 목록 요청성공')
      // console.log(res)
      console.log(res.data)
      setRateList(res.data)
      // setFollowing(res.data)
      // setFollowing(res.data)
    }).catch((err)=>{
      console.log('좋아요 목록 요청실패')
      console.log(err)
    });
  };
  // useEffect실행순서 바텀->탑
  useEffect(()=>{
    console.log('챙겨오기~')
    console.log(following)
    console.log('유저출력~')
    console.log(user)
    if(user){
      for(let i=0;i<Object(following).length;i++){
        if(following[i].id === user.id){
          setFollowBtn(false)
        }
      }
      for(let i=0;i<Object(rateList).length;i++){
        if(rateList[i].userId === user.id){
          setLikeBtn(false)
        }
      }
    }
  },[rateList,following,remail])

  useEffect(() => {
    getFollowing()
    getRateList()
  }, [remail]);
  // useEffect(()=>{
  //   getRateList()
  // },[cmtarr])






  return (
    <>
      <Container>
        <Row>
          <Col sm={2} xs={2}></Col>
          <Col sm={4} xs={4}>
          
          {
            user
            ?<> 
            <Avatar
        alt="ProfileImage"
        src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/profile/${user.profileImg}`}
        // src="/user/young-man.png"
        sx={{ width: 100, height: 100 }}
      />
            <ListGroup variant="flush">
            <ListGroup.Item><div className="fw-bold">Name</div>{user.name}{' '}{
    followBtn
    ?<>  <Button variant="secondary" size="sm" onClick={userFollow}>
    follow
  </Button></>
    :<>  <Button variant="outline-secondary" size="sm" onClick={userFollow}>
    unfollow
  </Button></>
  }
{' '}
{
          likeBtn
          ?<FavoriteBorderIcon onClick={userLike} style={{cursor:'pointer'}}></FavoriteBorderIcon>
          :<FavoriteIcon onClick={userLike} style={{cursor:'pointer'}}></FavoriteIcon>
        }
            </ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Email</div>{user.email}</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Native Language</div>{
          langc
          ?<>
          {
            langc.map((a,i)=>{
              return <span key={i}>
                  {larr[a-1]}
                  <img src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lImg[larr[a-1]]}.png`} width={25}
                  style={{margin:'5px'}}></img>
              </span>
            })
          }
          </>        
          :null
        }</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Second Language</div>{
          langb
          ?<span>
          {
            langb.map((a,i)=>{
              return <span key={i}>
                
                      {larr[a-1]} 
                      <img style={{margin:'5px'}}
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lImg[larr[a-1]]}.png`} width={25}></img>

              </span>
            })
          }
          </span>
          :null
        }</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Study Language</div>{
          langa
          ?<span>
          {
            langa.map((a,i)=>{
              return <span key={i}>
                
           {larr[a-1]} 
                      <img style={{margin:'5px'}}
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lImg[larr[a-1]]}.png`} width={25}></img>

              </span>
            })
          }
          </span>
          :null
        }</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Sex</div>{user.gender === 1
              ? <>Woman</>
              : <>Man</>
            }</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Age</div>{user.age}</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Rating</div>{userRating}</ListGroup.Item>
            <ListGroup.Item><div className="fw-bold">Description</div>{user.description}</ListGroup.Item>
          </ListGroup>
            </>
            :null
          }
          <Button onClick={() => {
                // router.push('/main') 
                history.back()
              }} style={{margin:'5px'}}
              className="btncs" variant="outline-secondary">Back</Button>
            
         
          </Col>
          <Col sm={6} xs={6}><h1>User Comment</h1>
          <ListGroup variant="flush" style={{width:"300px"}}>
            {
              cmtarr&&me
              // 내 데이터랑, 전체 데이터 다 있을 때만
              ?<>{cmtarr.map((a:any,i:any)=>{
                return <ListGroup.Item key={i}>
                  <span style={{cursor:'cursor'}} onClick={()=>{
                    setRemail(a.email)
                    setLangA([])
                    setLangB([])
                    setLangC([])
                    setLikeBtn(true)
                    setFollowBtn(true)
                    // email = a.email
              // router.push('/')
              // router.push(
              //   {
              //     pathname: `/user/detail/`,
              //     query: {
              //       email:a.email,
              //     },
              //   },
              //   `/user/detail/`
              //   )
            }}>{a.name}</span>
                  {':'}{a.reviewTxt}
                {
                  a.reviewUserId === me.id
                  ?<><Button onClick={DeleteComment}
                  // className="btncs" 
                           variant="outline-secondary"
                           >X</Button>
                  {/* <button onClick={DeleteComment}>{'x'}</button> */}
                  </>
                  :<></>
                }
                </ListGroup.Item>
              })
              }</>
              :<></>
            }
  
  {/* <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
  <ListGroup.Item>Morbi leo risus</ListGroup.Item>
  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item> */}
</ListGroup>
{/* {comment} */}
          <FormControl onChange={handleComment} maxLength={25}
          aria-label="Small" aria-describedby="inputGroup-sizing-sm" style={{width:"350px",display:'inline'}} className="formct"/>

          <Button onClick={WriteComment}
          className="btncs" 
                   variant="outline-secondary"
                   style={{marginBottom:'5px'}} >Write</Button>
                   <Button onClick={UpdateComment}
          className="btncs" 
                   variant="outline-secondary"
                   style={{marginBottom:'5px'}} >Update</Button>
                   
                
          </Col>
          

        </Row>
      </Container>
 

      <style jsx>{`
        
        .logdiv {
          width:300px;
          margin-top:50px;
        }
        .link {
          color: black;
          text-decoration-line: none;
        }

      `}</style>
    </>
  )
}