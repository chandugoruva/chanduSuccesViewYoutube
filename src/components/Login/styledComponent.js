import styled from 'styled-components'

export const LoginDiv = styled.div`
  background-color: #ffffff;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const LoginSubDiv = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  min-width: 300px;
  min-height: 300px;
  box-shadow: 0 4px 16px 0 #bfbfbf;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const LoginImage = styled.img`
  height: 30px;
  margin-bottom: 10px;
  text-align: center;
`
export const Input = styled.input`
  border: 2px #e2e8f0 solid;
  border-radius: 4px;
  width: 230px;
  height: 26px;
  padding: 10px;
  outline: none;
  font-weight: 400;
  margin-top: 6px;
  margin-bottom: 6px;
`
export const Label = styled.label`
  font-size: 14px;
  font-family: 'Roboto';
  color: #616e7c;
  font-weight: 600;
`
export const InputCheck = styled.input``
export const InputLabel = styled.label`
  font-size: 14px;
  font-family: 'Roboto';
  color: #231f20;
`
export const LoginButton = styled.button`
  background-color: #3b82f6;
  font-weight: 600;
  width: 240px;
  height: 30px;
  font-family: 'Roboto';
  margin-top: 6px;
  border-radius: 6px;
  border-width: 0px;
  color: #ffffff;
`
export const ErrorMsg = styled.p`
  color: red;
`
