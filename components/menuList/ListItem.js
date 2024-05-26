export default function ListItem(props){
    console.log('props are, ', props)
    const {productType} = props;

    const handleOnMouseOver = () => {

    }

    // will adjust the code to 
    return (
        <section onMouseOver={() => {
            handleOnMouseOver();
        }} 
            onMouseLeave={() => {
            handleOnMouseLeave();
        }} >
        <div>
            <p className="p">
                {productType}
            </p>
        </div>
        </section>
    )
}