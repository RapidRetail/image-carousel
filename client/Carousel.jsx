// Call this file something else and export it to the index.js file
import React from 'react'
import Modal from './Modal.jsx'
import Thumbnails from './Thumbnails.jsx'
import Image from './Image.jsx'

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: this.props.images[0],
      imageStyle: {
        top: '0',
      },
      scrollTop: 0,
      imageIndex: 0,
      imageSelectIndex: 0,
      didScroll: false,
      modalStyles: {
        display: 'none',
      },
    };
    this.scrollView = this.scrollView.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    $(window).on('scroll', this.scrollView);
  }
  isVisible(el) {
    var scrollTop = $(window).scrollTop();
    var scrollHeight = scrollTop + $(window).height();
    var elOffset = $(el).offset().top - 200;
    var elHeight = elOffset + $(window).height();
    if (scrollTop >= elOffset && elHeight <= scrollHeight) return true;
  }
  scrollView() {
    this.props.images.forEach((image, index) => {
      var splitUrl = image.split('/');
      var getFileName = splitUrl[splitUrl.length - 1].split('?');
      var getImageName = getFileName[0].split('.')[0];
      if (this.isVisible(`#${getImageName}`)) {
        document.getElementById(this.state.imageIndex).parentNode.style.opacity = 0.4;
        document.getElementById(index).parentNode.style.opacity = 1;
        this.setState({imageUrl: this.props.images[index]});
        this.setState({imageIndex: index});
      }
    })
  }
  openModal(e) {
    this.setState({imageSelectIndex: e.target.className});
    document.getElementById('modal').style.top = $(window).scrollTop() + 'px';
    this.setState({modalStyles: {display: 'block'}});
    document.body.style.overflow = 'hidden';
  }
  closeModal() {
    this.setState({modalStyles: {display: 'none'}});
    document.body.style.overflow = 'visible';
  }
  render() {
    return(
      <div>
        <Modal imageIndex={this.state.imageSelectIndex} closeModal={this.closeModal} styles={this.state.modalStyles} urlsList={this.props.images} />
        <div>
          <ul className="breadcrumb-trail">
            {this.props.productType.map((productDetail, index) => (
              <li key={index}><a href="#">{productDetail}</a></li>
            ))}
          </ul>
        </div>
        <Thumbnails imageUrls={this.props.images} />
        <div id="image-carousel">
          {this.props.images.map((image, index) => (
            <Image openModal={this.openModal} ind={index} key={index} imageSrc={image} />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
