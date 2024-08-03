const footerStyle:{
} = {
    'position': 'fixed',
    'bottom': '0',
    'backgroundColor': "#38485f",
    'color': 'whitesmoke',
    'width': '100%',
    'textAlign': 'right',
    'padding': '5px',
}
export function Footer(){



    return <div style={footerStyle}>
        <h5 style={{fontWeight: 'normal'}}>&#169; Copyright 2024</h5>
    </div>

}

export default Footer