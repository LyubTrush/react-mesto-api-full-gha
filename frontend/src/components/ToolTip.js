export default function ToolTip({isOpen, onClose, image, title}) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
          <div className="popup__tool">
            <img className="popup__tool-img" src={image} alt={title}/>
            <h2 className="popup__tool-title">{title}</h2>
            <button className="popup__btn-close" type="button" title="Закрыть" onClick={onClose}/>
          </div>
        </div>
      );
}