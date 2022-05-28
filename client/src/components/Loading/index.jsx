import './style.scss'

function Loading( { style } ) {
    return ( 
        <div className="loading" style={style ? { 'position': 'absolute' } : {}}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
     );
}

export default Loading;