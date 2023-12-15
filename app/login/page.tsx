import {Button, Container, TextField} from "@mui/material";

export default function Page() {
    return (
        <div>
          <Container maxWidth='md' className='mt-24 w-1/4'>
            <form>
              <TextField
                required
                fullWidth
                margin='normal'
                id='username'
                label='Username'
                defaultValue='Username'
                />
              <TextField
                required
                fullWidth
                margin='normal'
                id='username'
                label='Password'
                type='password'
                defaultValue='Password'
                />
              <Button variant='contained'>SignIn</Button>
            </form>
          </Container>
        </div>
    )
}
