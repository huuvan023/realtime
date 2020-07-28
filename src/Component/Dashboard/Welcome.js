import React, { Fragment } from 'react'
import Container from '@material-ui/core/Container';

class Welcome extends React.Component {
    render(){
          var text = 'adasdas';
            var classFont = '';
            var direction = 1;
            var arc = 150;
        return(
            
            <Fragment>
                <Container maxWidth='lg' style={ style.container } >
                <div className="circle">
                <h1>
                    <span>Welcome</span>
                    <br/><span>to</span><br/>
                    <span>Awesome chat!</span>
                </h1>
            </div>
                </Container>
            </Fragment>
        );
    }
}
const style = {
    container: {
        "padding":"0",
        "width": "100%",
        "height": "100%",
        "display":"flex",
        "alignItem":"center",
        "justifyContent":"center"
    },
    slider: {
        "width":"100%",
    }
}
export default Welcome;