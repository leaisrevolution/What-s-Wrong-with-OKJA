import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../../common/redux/modules/post';

// components
import {
  Circle,
  Container,
  Header,
  Text,
  Grid,
  Button,
  Input,
  Navbar,
  Image,
  Modal,
} from '../../common/components';
import { useDropzone } from 'react-dropzone';
import HowTo from './HowTo';

// import api from '../../common/utils/API';

const MainPage = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [age, setAge] = useState('');
  const [name, setName] = useState('');

  // 업로드 방식 모달
  const [modalOpen, setModalOpen] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpg, image/png, image/jpeg',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const images = files.map((file) => (
    <div>
      <img
        src={file.preview}
        style={{
          width: '13rem',
          height: '13rem',
          borderRadius: '13rem',
        }}
        alt="preview"
        center
      />
    </div>
  ));

  const addPost = () => {
    if (files.length === 0) {
      window.alert('이미지를 업로드해주세요');
      return;
    }

    if (!name) {
      window.alert('댕댕이의 이름을 입력해주세요');
      return;
    }
    if (!age) {
      window.alert('댕댕이의 나이를 입력해주세요');
      return;
    }
    let post = {
      name: name,
      age: age,
      image: files[0],
    };
    console.log(post);
    dispatch(postActions.addPostAX(post));
    history.push('/analysis');
  };

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeAge = (e) => {
    setAge(e.target.value);
  };

  const _session_key = null;
  const is_login = sessionStorage.getItem(_session_key);

  if (is_login)
    <Container height="100vh">
      <Header />
      <Navbar />

      <Grid margin="2rem auto">
        <Text type="mainTitle" color="var(--main)">
          감정상태를 분석할 댕댕이를 골라주세요.
        </Text>
      </Grid>

      <Grid margin="2rem auto">
        <Grid is_flex margin="0 0 3rem 0">
          <Image size="15" />
          <Image size="15" />
          <Image size="15" />
        </Grid>
      </Grid>

      <Grid margin="1rem auto">
        <Grid is_flex width="100%">
          <Button
            width="48%"
            padding="0.5rem"
            bg="var(--main)"
            color="var(--white)"
            radius="5px"
            cursor
            // 중간 점검 이후 변경 예정
            // _onClick={() => history.push('/login')}
          >
            <Text type="button" color="var(--white)">
              사진찍기 / 업로드
            </Text>
          </Button>
          <Button
            width="48%"
            padding="0.5rem"
            bg="var(--main)"
            color="var(--white)"
            radius="5px"
            cursor
            _onClick={addPost}
            // _onClick={() => history.push('/result')}
          >
            <Text type="button" color="var(--white)">
              분석 시작
            </Text>
          </Button>
        </Grid>
      </Grid>
    </Container>;

  return (
    <>
      <Container>
        <Header />
        <Navbar />

        <Grid margin="2rem auto">
          <Text type="mainTitle" color="var(--blackcream)">
            반려견과 반려인의 첫 걸음,
            <br /> 지금 당신의 반려견 감정 상태를 분석해보세요.
          </Text>
        </Grid>

        <SectionWrapper>
          <Grid >
            <Grid margin="2rem auto" display="flex" justifyContent="center">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Circle size="15" cursor>
                  {isDragActive ? null : <div>{images}</div>}
                </Circle>
              </div>
            </Grid>
          </Grid>

          <Grid>
            <Grid display="flex" justifyContent="flex-end">
              <Button
                padding="0.5rem"
                bg="transparent"
                radius="5px"
                cursor
                _onClick={() => {
                  setModalOpen(true);
                }}
              >
                <Text type="body" color="var(--main)">
                  이미지 업로드 방식
                </Text>
              </Button>
            </Grid>
            <Grid margin="2rem auto">
              <Grid is_flex margin="0 0 3rem 0">
                <Input
                  placeholder="댕댕이의 이름을 입력해주세요."
                  value={name}
                  _onChange={changeName}
                />
              </Grid>

              <Grid is_flex margin="0 0 1rem 0">
                <Input
                  placeholder="댕댕이의 나이를 입력해주세요."
                  value={age}
                  _onChange={changeAge}
                />
              </Grid>
            </Grid>

            <Grid margin="1rem auto" width="100%">
              <Grid is_flex width="100%">
                <ButtonWrapper {...getRootProps()}>
                  <Button
                    width="100%"
                    padding="0.5rem"
                    bg="var(--main)"
                    color="var(--white)"
                    radius="5px"
                    cursor
                  >
                    <input
                      id="img-upload"
                      // accept="image/jpg, image/png, image/jpeg"
                      type="file"
                      capture="camera"
                      hidden
                    />
                    <Text type="button" color="var(--white)">
                      사진 찍기/ 업로드
                    </Text>
                  </Button>
                </ButtonWrapper>

                <ButtonWrapper>
                  <Button
                    width="100%"
                    padding="0.5rem"
                    bg="var(--main)"
                    color="var(--white)"
                    radius="5px"
                    cursor
                    _onClick={addPost}
                  >
                    <Text type="button" color="var(--white)">
                      분석 시작
                    </Text>
                  </Button>
                </ButtonWrapper>
              </Grid>
            </Grid>
          </Grid>
        </SectionWrapper>
      </Container>
      {modalOpen && (
        <Modal width="30rem" height="40rem" setOpenModal={setModalOpen}>
          <HowTo />
        </Modal>
      )}
    </>
  );
};

const SectionWrapper = styled.section`
  /* width: 48%; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const ButtonWrapper = styled.div`
  justify-content: space-between;
  width: 48%;
  ${({ theme }) => theme.device.mobile} {
    width: 48%;
    min-width: 10rem;
  }
  ${({ theme }) => theme.device.fold} {
    min-width: 48%;
  }
`;

export default MainPage;
