import styled from "styled-components"
import { Button } from "../general"
import { COLOR } from "../../constants/style"

const Edit = styled(Button)`
  color: gray;
  border: 1px solid rgba(0,0,0,0.1);

  &:hover {
    color: white;
    background:${COLOR.gray_light};
    border: 1px solid ${COLOR.gray_light};
    transition: all 0.3s;
  }

  & + & {
    margin-left: 8px;
  }
`

const CreateDeleteButton = ({handleCommentDelete, comment, name}) => {
  return(
    <Edit onClick={() => handleCommentDelete(comment.id)}>{name}</Edit>
  )
}

export default function CreateEditButtons({currentUser, comment, handleCommentDelete, handleUpdateButtonClick}) {
  const currentUserName = currentUser.username
  const currentUserRole = currentUser.role
  const editor = comment.User.username

  return(
    <>

      { currentUserName === editor && (
          <>
            <Edit
              onClick = { ()=> { handleUpdateButtonClick(comment.id)} }
            >
              編輯
            </Edit>
            <CreateDeleteButton
              handleCommentDelete = { handleCommentDelete }
              comment = { comment }
              name = {'刪除'}
            />
          </>
      )}

      { currentUserName !== editor && currentUserRole === 'admin' && (
          <CreateDeleteButton
            handleCommentDelete = { handleCommentDelete }
            comment = { comment }
            name = {'強制隱藏'}
          />
      )}

    </>
  )
}
