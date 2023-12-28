import {IconButton} from "@mui/material";
import styled from "@emotion/styled";

export const NoneOutlinedIconButton = styled(IconButton)`
  && {
    &:focus {
      outline: none; /* Remove the outline border on focus */
    }
  }
`;
