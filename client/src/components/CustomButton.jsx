

const CustomButton = ({type ,title ,containerStyles}) => {
  return (
    <div>
        <button
              type={type}
              className={containerStyles}
            >
             {title}
            </button>
    </div>
  )
}

export default CustomButton