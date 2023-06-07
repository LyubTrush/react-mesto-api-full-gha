import { Link } from "react-router-dom"

export default function HeaderNavBurger(props) {
    return(
         <div className={props.toogle ? 'header__nav-out_active' : 'header__nav-out'}>
            <p className="header__email">{props.email || ""}</p>
        <Link to="/signin" className="header__text" button hover onClick={props.onClickOut}>
                Выйти
              </Link>   
      </div> 
    )
}