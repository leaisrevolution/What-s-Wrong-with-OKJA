import React from 'react';
import styled from 'styled-components';

import { Grid } from './';

const Input = (props) => {
  const {
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        <TextareaForm
          rows={2}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></TextareaForm>
      </Grid>
    );
  }
  return (
    <Grid>
      {is_submit ? (
        <InputForm
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onSubmit(e);
            }
          }}
        />
      ) : (
        <InputForm type={type} placeholder={placeholder} onChange={_onChange} />
      )}
    </Grid>
  );
};
//   return (
//     <>
//       <InputForm />
//     </>
//   );
// };

// const InputForm = styled.input`
//   width: 100%;
//   height: 2.4rem;
//   border: 2px solid var(--lightgray);
//   border-radius: 5px;
//   padding: 0px 0px 0px 5px;
//   /* margin-bottom: 2rem; */
//   font-size: 1.3rem;
//   /* margin: 0 0 0 1.5rem; */
//   color: gray;
//   :focus {
//     outline: none;
//   }
//   ${({ theme }) => theme.device.mobile} {
//     min-width: 20rem;
//   }
// `;

const TextareaForm = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
`;

const InputForm = styled.input`
  width: 100%;
  height: 2.4rem;
  border: 2px solid var(--lightgray);
  border-radius: 5px;
  padding: 0px 0px 0px 5px;
  font-size: 1.3rem;
  color: gray;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: var(--gray);
  }
  ${({ theme }) => theme.device.mobile} {
    min-width: 20rem;
  }
`;

// const InputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 2rem;
// `;

export default Input;
