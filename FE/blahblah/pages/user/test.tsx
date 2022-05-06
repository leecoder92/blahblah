/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Login() {
  const [file,setFilfe] = useState<any>()
  const onPrint = ()=>{
    console.log(file)
  }
  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();
    
    
    if(e.target.files){
      const uploadFile = e.target.files[0]
      formData.append('file',uploadFile)
      setFilfe(uploadFile)
      console.log(uploadFile)
      console.log('===useState===')
      console.log(file)
    }
  }

  const onClickLogin = (event: any) => {
    event.preventDefault();
    axios({
      method:'get',
      url:`https://blahblah.community:8443/api/user/`,
    })
    .then((result)=>{
     console.log('get요청성공')
     console.log(result)
     console.log(result.data)
  })
    .catch((error)=>{console.log('요청실패')
    console.log(error)  
  })
  };

  const onClickLogin2 = (event: any) => {
    event.preventDefault();
    axios({
      method:'post',
      url:'https://blahblah.community:8443/api/user/checkemail',
      data: {
        'email':'flykimjiwon22@gmail.com'
      },
    })
    .then((result)=>{console.log('요청성공')
    console.log(result)
 
  })
    .catch((error)=>{console.log('요청실패')
    console.log(error)  
  })
  };

  const [ar,setAr] = useState<any>({})

  const arrayTest = (event:any)=>{
    event.preventDefault();
    let array:any = [{"code":"kor", "level":3}, {"code":"eng", "level":4}, {"code":"chi", "level":5}]
    // let arr={}
    // for (let i=0;i<array.length;i++){
    //   console.log(array[i])
    //   arr.append(array[i])
    //   setAr(arr)
    // }
    console.log('어레이넣었엉')
  }
  const arTest = ()=>{
    console.log(ar)
  }

  const onClickLogin3 = (event:any) => {
    event.preventDefault();


    const formData = new FormData();
    const info:any = {
      "email":"xxxdsdssddf555@ssafy.com",
      "name":"맛점",
      "gender":'5',
      "age":'37',
      "description":"테스계정입니다.",
      "password":"ssafy",
      "list" : [{"code":"kor", "level":'3'}, {"code":"en", "level":'4'}, {"code":"chi", "level":'5'}]
  }
    
    formData.append('file',file)
    // 이미지만 안들어가면 null처리
    // formData.append('info',info)
    // formData.append('info',JSON.stringify(info))
    formData.append('info',new Blob([JSON.stringify(info)],{type:"application/json"}))
    // console.log(info)
    // console.log(JSON.stringify(info))
    // console.log(new Blob([JSON.stringify(info)],{type:"application/json"}))

    
    // formData.append('email','test2022@ssafy.com')
    // formData.append('name','근태는백엔드')
    // formData.append('gender','0')
    // formData.append('age','29')
    // formData.append('description','근태는 백엔드 개발자입니다.')
    // formData.append('password','123123')
    
    // formData.append('list',[{"code":"kor", "level":3}, {"code":"eng", "level":4}, {"code":"chi", "level":5}])
    // var array:any = [{"code":"kor", "level":3}, {"code":"eng", "level":4}, {"code":"chi", "level":5}]
    // for (let i=0;i<array.length;i++){
    //   formData.append('list',array[i])
    // }
    
    axios({
      method:'post',
      url:'https://blahblah.community:8443/api/user/signup',
      data: formData,
      // {
      // 'email':'test2022@ssafy.com',
      // 'name':'근태근태',
      // 'gender':'0',
      // 'age':'30',
      // 'description':'sdfsdfdsfsdf',
      // 'password':'sfdsfd',
      // 'list':[{"code":"kor", "level":3}, {"code":"eng", "level":4}, {"code":"chi", "level":5}],

      // },
    })
    .then((result)=>{
    console.log('가입요청성공')
    console.log('============')
    console.log(result)
    console.log(result.data)
    console.log('============')
  })
    .catch((error)=>{
    console.log('가입요청실패')
    console.log('============')
    console.log(error)  
    console.log('============')
  })
  };


  return (
    <>
      
      <Container>

        <Row>
          <Col>
          


<hr/>


   
    
    
          </Col>
          <Col>
                <button type="submit" onClick={onClickLogin}>
                  테스트get
                </button>

                <button type="submit" onClick={onClickLogin2}>
                  테스트post
                </button>
                <form>
  <label htmlFor="profile-upload" />
  <input type="file" id="profile-upload" accept="image/*" onChange={onChangeImg}/>
</form>
                <button type="submit" onClick={onClickLogin3}>
                  멀티파트테스트post
                </button>
                <button onClick={onPrint}>쩐다</button>

                <button onClick={arrayTest}>어레이배열</button>
                <button onClick={arTest}>어레이배열테스트</button>

               
            </Col>
          <Col></Col>
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