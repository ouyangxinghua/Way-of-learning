import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class SvgIcon extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{position:'absolute',width:0,height:0}}>
        <defs>
          <symbol viewBox="0 0 26 31" id="location">
            <path fill="#FFF" fillRule="evenodd" d="M22.116 22.601c-2.329 2.804-7.669 7.827-7.669 7.827-.799.762-2.094.763-2.897-.008 0 0-5.26-4.97-7.643-7.796C1.524 19.8 0 16.89 0 13.194 0 5.908 5.82 0 13 0s13 5.907 13 13.195c0 3.682-1.554 6.602-3.884 9.406zM18 13a5 5 0 1 0-10 0 5 5 0 0 0 10 0z"></path>
          </symbol>
          <symbol viewBox="0 0 14 8" id="arrow">
            <path fill="#FFF" fillRule="evenodd" d="M5.588 6.588c.78.78 2.04.784 2.824 0l5.176-5.176c.78-.78.517-1.412-.582-1.412H.994C-.107 0-.372.628.412 1.412l5.176 5.176z"></path>
          </symbol>
          <symbol viewBox="0 0 28 33" id="arrow-left">
            <path fillRule="evenodd" d="M17.655 1.853L15.961.159.033 16.072 15.961 32l1.694-1.694L3.429 16.08 17.655 1.854z" className="path1"></path>
          </symbol>
          <symbol viewBox="0 0 32 31" id="shop">
            <g fillRule="evenodd">
              <path d="M28.232 1.822C27.905.728 26.97.152 25.759.152H5.588c-1.252 0-1.867.411-2.397 1.415l-.101.243-.443 1.434-.975 3.154-.002.007C.837 9.101.294 10.854.26 10.956l-.059.259c-.231 1.787.337 3.349 1.59 4.448 1.159 1.017 2.545 1.384 3.865 1.384.07 0 .07 0 .132-.002-.01.001-.01.001.061.002 1.32 0 2.706-.367 3.865-1.384a4.96 4.96 0 0 0 .413-.407l-1.043-.946-1.056.931c1.033 1.171 2.51 1.792 4.21 1.801.04.002.088.004.173.004 1.32 0 2.706-.367 3.865-1.384.148-.13.287-.267.418-.411l-1.044-.944-1.057.93c1.033 1.174 2.511 1.796 4.213 1.806.04.002.088.004.173.004 1.32 0 2.706-.367 3.865-1.384.15-.131.29-.27.422-.416l-1.046-.943-1.058.929c1.033 1.177 2.513 1.801 4.218 1.811.04.002.088.004.173.004 1.32 0 2.706-.367 3.865-1.384 1.206-1.058 1.858-2.812 1.676-4.426-.069-.61-.535-2.207-1.354-4.785l-.109-.342a327.554 327.554 0 0 0-1.295-3.966l-.122-.366.014.043h.004zm-2.684.85l.12.361.318.962c.329.999.658 2.011.965 2.973l.108.338c.719 2.262 1.203 3.92 1.24 4.249.08.711-.233 1.553-.735 1.993-.553.485-1.308.685-2.008.685l-.098-.002c-.987-.007-1.695-.306-2.177-.854l-1.044-1.189-1.06 1.175a2.192 2.192 0 0 1-.188.185c-.553.485-1.308.685-2.008.685l-.098-.002c-.985-.007-1.693-.305-2.174-.852l-1.043-1.185-1.059 1.171c-.058.064-.12.125-.186.183-.553.485-1.308.685-2.008.685l-.098-.002c-.984-.007-1.692-.304-2.173-.85L9.101 12.2l-1.058 1.166a2.248 2.248 0 0 1-.184.181c-.553.485-1.307.685-2.008.685l-.061-.001-.131.001c-.701 0-1.455-.2-2.008-.685-.538-.472-.767-1.102-.654-1.971l-1.396-.18 1.338.44c.043-.13.552-1.775 1.425-4.599l.002-.007.975-3.155.443-1.434-1.345-.415 1.245.658c.054-.102.042-.085-.083-.001-.122.082-.143.086-.009.086H25.763c.053 0-.164-.133-.225-.339l.014.043-.004-.001zM5.528 19.48c.778 0 1.408.63 1.408 1.408v7.424a1.408 1.408 0 1 1-2.816 0v-7.424c0-.778.63-1.408 1.408-1.408z"></path>
              <path d="M.28 29.72c0-.707.58-1.28 1.277-1.28h28.155a1.28 1.28 0 0 1 .007 2.56H1.561A1.278 1.278 0 0 1 .28 29.72z"></path>
              <path d="M26.008 19.48c.778 0 1.408.63 1.408 1.408v7.424a1.408 1.408 0 1 1-2.816 0v-7.424c0-.778.63-1.408 1.408-1.408z"></path>
            </g>
          </symbol>
          <symbol viewBox="0 0 1024 1024" id="res-bad">
            <path fill="#D0021B" fillRule="evenodd" d="M512 0C230.326 0 0 230.326 0 512s230.573 512 512 512 512-230.326 512-512S793.674 0 512 0zM240.694 373.755l158.735-56.285 15.306 46.164L256 419.919l-15.306-46.164zm440.409 384.123c-10.122 0-20.49-10.122-25.674-20.49-10.122-10.122-61.47-25.674-148.366-25.674-86.896 0-138.245 15.306-148.366 25.674 0 10.122-10.122 20.49-25.674 20.49s-25.674-10.122-25.674-25.674c0-71.591 174.041-71.591 194.53-71.591 20.489 0 194.53 0 194.53 71.591 10.122 10.368 0 25.674-15.306 25.674zM768 419.919l-163.672-61.47 15.306-46.164 158.735 56.285-10.368 51.348-.001.001z"></path>
          </symbol>
          <symbol viewBox="0 0 1146 885" id="choose">
            <path d="M1001.309 14.473c18.618-18.618 46.545-18.618 65.164 0l65.164 65.164c18.618 18.618 18.618 46.545 0 65.164L410.182 870.91c-18.618 18.618-46.545 18.618-65.164 0L14.545 545.092c-18.618-18.618-18.618-46.545 0-65.164l65.164-65.164c18.618-18.618 46.545-18.618 65.164 0L377.6 647.491l623.709-633.018z"></path>
          </symbol>
          <symbol viewBox="0 0 982 854" id="notice">
            <path d="M461.467 21.667c-12.8 0-29.867 4.267-51.2 25.6L214 256.334H73.2c-38.4 0-72.533 34.133-72.533 76.8v217.6c0 38.4 34.133 72.533 72.533 72.533H214l192 192c17.067 17.067 38.4 21.333 46.933 21.333 25.6 0 55.467-21.333 55.467-68.267V85.666c8.533-46.933-21.333-64-46.933-64v.001zm-29.867 691.2l-179.2-179.2H86v-192h166.4l174.933-192 4.267 563.2zM649.2.333v102.4C794.267 145.4 888.133 273.4 888.133 427S790 708.6 649.2 751.267v102.4C845.467 811 982 636.067 982 427 982 217.933 841.2 43 649.2.333z"></path>
            <path d="M772.933 427c0-85.333-46.933-162.133-123.733-192v388.267C726 589.134 772.933 512.334 772.933 427z"></path>
          </symbol>
          <symbol viewBox="0 0 547 987" id="arrow-right">
            <path d="M0 931.973l51.2 54.613 494.933-494.933L51.2.133 0 51.333l440.32 440.32L0 931.973z"></path>
          </symbol>
          <symbol viewBox="0 0 20 32" id="arrow-left">
            <path fill="#fff" d="M16.552 5.633l-2.044-2.044L2.243 15.854l12.265 12.557 2.044-2.044L6.331 15.854z"></path>
          </symbol>
          <symbol viewBox="0 0 188 163" id="res-collection">
            <path fill="#272636" fillRule="evenodd" d="M94.25 26.5C85.75 10.75 69.125 0 50.125 0 22.625 0 .375 22.375.375 50c0 13.125 5 25 13.25 34L90 160.75c1.25 1.125 2.75 1.75 4.25 1.75s3-.625 4.25-1.75L174.875 84C183 75.125 188 63.125 188 50c0-27.625-22.25-50-49.75-50-18.875 0-35.375 10.75-44 26.5zm71.125 49.375l-71.125 72.25-71.125-72.25C16.75 69.125 12.875 60 12.875 50c0-20.75 16.75-37.5 37.25-37.5 16.625 0 31 11 36 26.125 1.25 3.25 4.5 5.625 8.125 5.625 3.75 0 6.875-2.25 8.25-5.5 4.875-15.25 19.125-26.25 35.75-26.25 20.625 0 37.25 16.75 37.25 37.5.125 10-3.75 19.125-10.125 25.875z"></path>
          </symbol>
          <symbol viewBox="0 0 1024 1024" id="res-well">
            <path fill="#7ED321" fillRule="evenodd" d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0zM247.808 402.432c0-36.864 39.936-93.184 93.184-93.184s93.184 56.32 93.184 93.184c0 11.264-9.216 20.48-20.48 20.48-11.264 0-20.48-9.216-20.48-20.48 0-16.384-24.576-52.224-52.224-52.224-27.648 0-52.224 35.84-52.224 52.224 0 11.264-9.216 20.48-20.48 20.48-11.264 0-20.48-9.216-20.48-20.48zM512 800.768c-132.096 0-239.616-96.256-239.616-215.04 0-11.264 9.216-20.48 20.48-20.48 11.264 0 20.48 9.216 20.48 20.48 0 96.256 89.088 174.08 198.656 174.08 109.568 0 198.656-77.824 198.656-174.08 0-11.264 9.216-20.48 20.48-20.48 11.264 0 20.48 9.216 20.48 20.48 0 117.76-107.52 215.04-239.616 215.04zm243.712-377.856c-11.264 0-20.48-9.216-20.48-20.48 0-17.408-24.576-52.224-52.224-52.224-28.672 0-52.224 34.816-52.224 52.224 0 11.264-9.216 20.48-20.48 20.48-11.264 0-20.48-9.216-20.48-20.48 0-36.864 39.936-93.184 93.184-93.184s93.184 56.32 93.184 93.184c0 11.264-9.216 20.48-20.48 20.48z"></path>
          </symbol>
          <symbol viewBox="0 0 1024 1024" id="res-ordinary">
            <path fill="#febb00" fillRule="evenodd" d="M670.476 454.548c33.663 0 60.952-27.019 60.952-60.349s-27.289-60.349-60.952-60.349-60.952 27.019-60.952 60.349 27.289 60.349 60.952 60.349zm-316.952 0c33.663 0 60.952-27.019 60.952-60.349s-27.289-60.349-60.952-60.349-60.952 27.019-60.952 60.349 27.289 60.349 60.952 60.349zM0 508.862C0 228.892 226.941 1.931 506.938 1.931h10.125c279.974 0 506.938 226.899 506.938 506.931 0 279.97-226.941 506.931-506.938 506.931h-10.125C226.964 1015.793 0 788.894 0 508.862zm292.571 187.081c0 13.425 10.844 24.14 24.22 24.14h390.417c13.372 0 24.22-10.808 24.22-24.14 0-13.425-10.844-24.14-24.22-24.14H316.791c-13.372 0-24.22 10.808-24.22 24.14z" className="path1 fill-color2"></path>
          </symbol>
          <symbol viewBox="0 0 1024 1024" id="res-x">
            <path fillRule="evenodd" d="M480.518 512L8.377 984.141c-8.853 8.853-8.777 22.871-.083 31.565 8.754 8.754 22.825 8.656 31.565-.083L512 543.482l472.141 472.141c8.853 8.853 22.871 8.777 31.565.083 8.754-8.754 8.656-22.825-.083-31.565L543.482 512l472.141-472.141c8.853-8.853 8.777-22.871.083-31.565-8.754-8.754-22.825-8.656-31.565.083L512 480.518 39.859 8.377C31.006-.476 16.988-.4 8.294 8.294c-8.754 8.754-8.656 22.825.083 31.565L480.518 512z" className="path1 fill-color3"></path>
          </symbol>
          <symbol viewBox="0 0 12 6" id="activity-more">
            <path fillRule="evenodd" d="M4.577 5.423c.79.77 2.073.767 2.857 0l4.12-4.026C12.345.625 12.09 0 10.985 0H1.027C-.077 0-.33.63.457 1.397l4.12 4.026z"></path>
          </symbol>
          <symbol viewBox="0 0 22 22" id="rating-star">
            <path fillRule="evenodd" d="M10.986 17.325l-5.438 3.323c-1.175.718-1.868.208-1.55-1.126l1.48-6.202-4.84-4.15c-1.046-.895-.775-1.71.59-1.82l6.353-.51L10.03.95c.53-1.272 1.39-1.266 1.915 0l2.445 5.89 6.353.51c1.372.11 1.632.93.592 1.82l-4.84 4.15 1.478 6.202c.32 1.34-.38 1.84-1.55 1.126l-5.437-3.323z"></path>
          </symbol>
          <symbol viewBox="0 0 64 64" id="loading">
            <path fillRule="evenodd" d="M60 36h-8c-2.203 0-4-1.797-4-4 0-2.208 1.797-4 4-4h8c2.203 0 4 1.792 4 4 0 2.203-1.797 4-4 4zM48.973 20.686a4 4 0 0 1-5.66 0 3.995 3.995 0 0 1 0-5.655l5.66-5.653a3.99 3.99 0 0 1 5.65 0 4 4 0 0 1 0 5.655l-5.65 5.656zM32 64a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4c2.203 0 4 1.797 4 4v8c0 2.203-1.797 4-4 4zm0-48a4 4 0 0 1-4-4V4a4 4 0 1 1 8 0v8c0 2.208-1.797 4-4 4zM15.03 54.624a3.995 3.995 0 0 1-5.654 0 3.99 3.99 0 0 1 0-5.65l5.655-5.66a3.995 3.995 0 0 1 5.657 0 4.004 4.004 0 0 1 0 5.66l-5.655 5.65zm0-33.938L9.373 15.03a3.995 3.995 0 0 1 0-5.654 4 4 0 0 1 5.654 0l5.655 5.655a3.995 3.995 0 0 1 0 5.657 3.99 3.99 0 0 1-5.65 0zM16 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4 4 4 0 0 1 4-4h8a4 4 0 0 1 4 4zm32.973 11.314l5.65 5.66a3.99 3.99 0 0 1 0 5.65 3.992 3.992 0 0 1-5.65 0l-5.66-5.65a4 4 0 0 1 0-5.66 4 4 0 0 1 5.66 0z"></path>
          </symbol>
          <symbol viewBox="0 0 34 33" id="nice">
            <g fillRule="evenodd">
              <path d="M19.1 10s.404-1.959.685-3.294l.068-.323a472.237 472.237 0 0 1 .83-3.832l.077-.352C21.016 1.036 20.194 0 19.01 0H14.49c-.625 0-1.284.377-1.606.915l-5.742 9.57L8 10H2.003A1.995 1.995 0 0 0 0 11.999V31C0 32.106.9 33 2.003 33h23c1.548 0 3.082-1.157 3.507-2.645l4.63-16.204C33.776 11.923 32.32 10 30 10H19.1zM18 12h12c.993 0 1.488.653 1.217 1.601l-4.63 16.205c-.18.629-.929 1.194-1.584 1.194h-23L2 11.999C2 11.996 8 12 8 12h.566l.291-.486 5.743-9.57c-.037.061-.028.056-.109.056h4.518c-.1 0-.22-.152-.202-.233l-.078.354a513.863 513.863 0 0 0-.832 3.848l-.069.325c-.284 1.349-.51 2.46-.657 3.255-.087.465-.146.818-.177 1.058a2.394 2.394 0 0 0-.026.41c.004.078.004.078.027.21.039.185.039.185.349.563.717.292.656.21.656.21z"></path>
              <path d="M7 10h2v22H7z"></path>
            </g>
          </symbol>
          <symbol viewBox="0 0 16 25" id="tab_found_next_page">
            <path fill="none" fillRule="evenodd" stroke="#CCC" strokeLinecap="round" strokeWidth="3" d="M2.127 2l10.87 10.582L2.291 23.11"></path>
          </symbol>
          <symbol viewBox="0 0 35 35" id="tag">
            <g>
              <path d="M12.6 33.4c-.3 0-.5-.1-.7-.3L-.7 20.4c-.4-.4-.4-1 0-1.4L18.8-.7c.2-.2.5-.3.7-.3h12.9c.6 0 1 .4 1 1v12.3c0 .3-.1.5-.3.7L13.3 33c-.1.2-.4.3-.7.4zM1.4 19.7l11.2 11.2 18.8-19V1H20L1.4 19.7z" transform="translate(0 4)"></path>
              <path d="M24.8 10.9c-2.1 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7 3.7 1.7 3.7 3.7-1.7 3.7-3.7 3.7zm0-5.5c-1 0-1.7.8-1.7 1.7 0 1 .8 1.7 1.7 1.7 1 0 1.7-.8 1.7-1.7 0-.9-.8-1.7-1.7-1.7zM6.9 21.9c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l9.7-9.7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-9.7 9.7c-.2.2-.5.3-.7.3zM10.3 25.3c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l6.5-6.5c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L11 25c-.2.2-.5.3-.7.3z" transform="translate(0 4)"></path>
            </g>
          </symbol>
          <symbol viewBox="25 25 40 40" id="alarm">
            <g>
              <path d="M10 29.9c-7.2 0-13-5.8-13-13 0-2 .4-3.9 1.3-5.7C.5 6.7 5 3.9 10 3.9c7.2 0 13 5.8 13 13s-5.8 13-13 13zM.1 12.1C-.7 13.6-1 15.2-1 16.9c0 6.1 4.9 11 11 11s11-4.9 11-11-4.9-11-11-11c-4.3 0-8.1 2.3-9.9 6.2z" transform="translate(34 32)"></path>
              <path d="M-1 12.1c-1.8-.9-3-2.7-3-4.8C-4 4.4-1.6 2 1.3 2c2 0 3.8 1.1 4.7 2.8l-1.8 1C3.7 4.7 2.5 4 1.3 4-.5 4-2 5.5-2 7.3c0 1.3.7 2.4 1.8 3l-.8 1.8zM21 11.8l-1-1.7c1-.6 1.6-1.7 1.6-2.8 0-1.8-1.5-3.3-3.3-3.3-1.3 0-2.5.8-3.1 2l-1.8-.8c.8-2 2.8-3.3 4.9-3.3 2.9 0 5.3 2.4 5.3 5.3-.1 2-1 3.7-2.6 4.6zM14.3 20.2h-4.2c-.6 0-1-.4-1-1v-8.1c0-.6.4-1 1-1s1 .4 1 1v7.1h3.2c.6 0 1 .4 1 1s-.4 1-1 1zM-1.2 32c-.2 0-.5-.1-.7-.3-.4-.4-.4-1-.1-1.4l4-4.5c.4-.4 1-.4 1.4-.1.4.4.4 1 .1 1.4l-4 4.5c-.2.3-.4.4-.7.4zM21.5 32c-.3 0-.5-.1-.7-.3l-4-4.5c-.4-.4-.3-1 .1-1.4.4-.4 1-.3 1.4.1l4 4.5c.4.4.3 1-.1 1.4-.2.1-.4.2-.7.2z" transform="translate(34 32)"></path>
            </g>
          </symbol>
          <symbol viewBox="0 0 1024 1024" id="back-top">
            <path d="M109.078 75.5h805.846v134.308H109.076s0-134.308.002-134.308zm805.846 604.384H713.462V948.5H310.538V679.884H109.076L512 276.962l402.924 402.922z"></path>
          </symbol>
          <symbol viewBox="0 0 655 1024" id="mobile">
            <path d="M0 122.501v778.998C0 968.946 55.189 1024 123.268 1024h408.824c68.52 0 123.268-54.846 123.268-122.501V122.501C655.36 55.054 600.171 0 532.092 0H123.268C54.748 0 0 54.846 0 122.501zM327.68 942.08c-22.622 0-40.96-18.338-40.96-40.96s18.338-40.96 40.96-40.96 40.96 18.338 40.96 40.96-18.338 40.96-40.96 40.96zM81.92 163.84h491.52V819.2H81.92V163.84z"></path>
          </symbol>
          <symbol viewBox="0 0 40 40" id="order">
            <path d="M31.5 3h-23C6 3 4 5.1 4 7.7v24.7C4 34.9 6 37 8.5 37h23c2.5 0 4.5-2.1 4.5-4.7V7.7C36 5.1 34 3 31.5 3zM11.8 28.2c-1.1 0-2-.9-2-2.1 0-1.1.9-2.1 2-2.1s2 .9 2 2.1c0 1.2-.9 2.1-2 2.1zm0-6.1c-1.1 0-2-.9-2-2.1 0-1.1.9-2.1 2-2.1s2 .9 2 2.1c0 1.1-.9 2.1-2 2.1zm0-6.2c-1.1 0-2-.9-2-2.1 0-1.1.9-2.1 2-2.1s2 .9 2 2.1c0 1.2-.9 2.1-2 2.1zm5.1 11.9h13.5v-2.6H16.9v2.6zm0-6.5h13.5v-2.6H16.9v2.6zm0-6.6h13.5v-2.6H16.9v2.6z"></path>
          </symbol>
          <symbol viewBox="0 0 40 40" id="point">
            <path d="M34.6 7.1c0-1.1-1-2.1-2.1-2.1h-24c-1.1 0-2 1-2.1 2.1l-1.6 25C4.6 34.3 6.3 36 8.5 36h24c2.2 0 3.9-1.7 3.7-3.9l-1.6-25zm-5.9 6.1c-.2 4.6-3.7 8.2-8.3 8.2-4.6 0-8.2-3.7-8.4-8.3-.3-.2-.5-.6-.5-1 0-.7.6-1.2 1.3-1.2s1.3.6 1.3 1.2c0 .5-.3.9-.7 1.1.2 3.8 3.2 6.8 7.1 6.8 3.9 0 6.8-3.1 7-6.9-.4-.2-.6-.6-.6-1.1 0-.7.6-1.2 1.3-1.2s1.3.6 1.3 1.2c-.2.6-.4 1-.8 1.2z"></path>
          </symbol>
          <symbol viewBox="0 0 40 40" id="vip">
            <path d="M32.1 14.3c-.6 2.3-2.6 4-5.1 4-2.9 0-5.3-2.3-5.3-5.2v-.2c-.5.2-1 .3-1.6.3-.6 0-1.1-.1-1.7-.3v.2c0 2.9-2.4 5.2-5.3 5.2-2.5 0-4.6-1.7-5.1-4.1-.5.4-1.2.6-1.8.6-.3 0-.5.1-.8 0L7.2 29h26l1.7-14.2c-.3.1-.5.1-.8.1-.8 0-1.5-.2-2-.6z"></path>
          </symbol>
          <symbol viewBox="0 0 40 40" id="service">
            <g>
              <path id="service_XMLID_6_" d="M32.2 9.5c-.2-.7-.1-.7-.4-.9-1.7-1.2-5.3.2-6.7 1.9-.8-3.8-3.8-6.1-4.7-5.9-.9-.2-4 2.1-4.8 5.9-1.3-1.7-5-3.1-6.7-1.9-.1.1-.5.6-.5.7C5.4 20.7 15 24.6 19 25.7v8.7c0 .7.3 1.2 1 1.2s1-.5 1-1.2v-8.6c4-1 14.2-4.8 11.2-16.3z"></path>
              <path id="service_XMLID_7_" d="M6 25c-.9 0-1.6.7-1.6 1.5.1.8.7 1.5 1.6 1.5 3.1 0 6.5 1.5 8.5 3.7.3.3.7.6 1.1.6.4 0 .7-.1 1-.4.6-.6.6-1.6.1-2.3C14.1 26.8 10 25 6 25z"></path>
              <path id="service_XMLID_8_" d="M34.6 25c-4 0-8.1 1.9-10.7 4.6-.6.6-.5 1.6.1 2.2.3.3.7.4 1 .4.4 0 .8-.3 1.1-.6 2-2.1 5.3-3.7 8.4-3.7h.1c.8 0 1.5-.7 1.5-1.5 0-.7-.7-1.4-1.5-1.4z"></path>
            </g>
          </symbol>
          <symbol viewBox="0 0 40 40" id="download">
            <path d="M30 5H10c-2.8 0-5 2.2-5 5v20c0 2.8 2.2 5 5 5h20c2.8 0 5-2.2 5-5V10c0-2.8-2.2-5-5-5zm-3.9 22.7c-.1.2-.3.4-.6.5-4.3 2.8-10.1 1.6-13-2.8-2.8-4.3-1.6-10.2 2.8-13 4.3-2.8 10.2-1.6 13 2.8.2.2.3.5.4.8.1.2 0 .5-.2.7l-8.8 5.7c-.2.2-.6.1-.7-.2l-.5-.7c-.4-.6-.2-1.5.4-1.9l5.6-3.6c.2-.2.3-.5.2-.7l-.1-.1c-2.2-1.8-5.4-2.1-7.9-.4-3.1 2-4 6.1-2 9.2 2 3.1 6.1 4 9.2 2 .6-.4 1.3-.2 1.7.4l.3.7c.1.2.4.5.2.6zm3.1-4.4l-.9.6c-.2.2-.6.1-.7-.2L26.5 22c-.2-.2-.1-.6.2-.7l1.8-1.1c.2-.2.6-.1.7.2l.6.9c.3.6.1 1.5-.6 2z"></path>
          </symbol>
          <symbol viewBox="0 0 122 122" id="avatar-default">
            <path fill="#DCDCDC" fillRule="evenodd" d="M61 121.5c33.413 0 60.5-27.087 60.5-60.5S94.413.5 61 .5.5 27.587.5 61s27.087 60.5 60.5 60.5zm12.526-45.806c-.019 3.316-.108 6.052.237 9.825 3.286 8.749 18.816 9.407 28.468 17.891-1.833 1.998-6.768 6.788-15 10.848-7.02 3.463-16.838 6.416-24.831 6.416-17.366 0-32.764-7.149-42.919-17.264 9.713-8.407 25.49-9.173 28.769-17.891.345-3.773.258-6.509.24-9.825l-.004-.002c-1.903-.985-5.438-7.268-6.01-12.571-1.492-.12-3.843-1.561-4.534-7.247-.37-3.053 1.107-4.77 2.004-5.31-5.046-19.212 1.507-33.16 20.749-34.406 5.753 0 10.18 1.52 11.909 4.523 15.35 2.702 11.756 22.658 9.328 29.882.899.54 2.376 2.258 2.004 5.31-.689 5.687-3.042 7.127-4.534 7.248-.575 5.305-3.25 10.82-5.873 12.57l-.003.003zM61 120.5C28.14 120.5 1.5 93.86 1.5 61S28.14 1.5 61 1.5s59.5 26.64 59.5 59.5-26.64 59.5-59.5 59.5z"></path>
          </symbol>
          <symbol viewBox="0 0 40 40" id="tabBar-home">
            <g fill="none" stroke="#666" strokeWidth="2"><path d="M31.426 23.095l2.678 5.742 2.943-1.372a3.173 3.173 0 0 0 1.537-4.212l-1.339-2.871-5.819 2.713z"></path><path d="M29.074 31.161c-1.224-.49-2.404-.32-3.49.185-6.383 2.977-13.938.286-16.875-6.01-2.936-6.297-.14-13.815 6.243-16.792 5.211-2.43 11.203-1.083 14.825 2.919l-12.263 5.718c-1.596.745-2.295 2.624-1.561 4.198.734 1.574 2.625 2.246 4.22 1.503l8.422-3.928 9.953-4.641a18.78 18.78 0 0 0-.941-2.453C33.202 2.416 21.869-1.62 12.294 2.844 2.718 7.309-1.474 18.586 2.93 28.03c4.404 9.445 15.737 13.482 25.313 9.017 1.069-.499 2.067-.879 3.438-1.744 0 0-1.382-3.651-2.607-4.142z"></path></g>
          </symbol>
          <symbol viewBox="0 0 40 40" id="tabBar-home-active">
            <g fill="#1fa7ff" stroke="#1fa7ff" strokeWidth="2"><path d="M31.426 23.095l2.678 5.742 2.943-1.372a3.173 3.173 0 0 0 1.537-4.212l-1.339-2.871-5.819 2.713z"></path><path d="M29.074 31.161c-1.224-.49-2.404-.32-3.49.185-6.383 2.977-13.938.286-16.875-6.01-2.936-6.297-.14-13.815 6.243-16.792 5.211-2.43 11.203-1.083 14.825 2.919l-12.263 5.718c-1.596.745-2.295 2.624-1.561 4.198.734 1.574 2.625 2.246 4.22 1.503l8.422-3.928 9.953-4.641a18.78 18.78 0 0 0-.941-2.453C33.202 2.416 21.869-1.62 12.294 2.844 2.718 7.309-1.474 18.586 2.93 28.03c4.404 9.445 15.737 13.482 25.313 9.017 1.069-.499 2.067-.879 3.438-1.744 0 0-1.382-3.651-2.607-4.142z"></path></g>
          </symbol>
          <symbol viewBox="0 0 40 40" id="tabBar-discover">
            <g fill="none"><path stroke="#666" strokeWidth="2" d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"></path><path stroke="#666" fill="#FFF" d="M12.79 28.126c-1.515.68-2.169.016-1.462-1.484l3.905-8.284c.47-.999 1.665-2.198 2.66-2.675l8.484-4.064c1.497-.717 2.153-.08 1.46 1.435l-3.953 8.64c-.46 1.006-1.647 2.186-2.655 2.64l-8.44 3.792z"></path><path fill="#666" d="M6.482 5.44c-.684-.294-.678-.764 0-1.055L11.54 2.45c.517-.198.936.085.936.65v3.625c0 .558-.412.852-.936.65L6.48 5.44z" transform="rotate(-45 34.258 3.92)"></path></g>
          </symbol>
          <symbol viewBox="0 0 40 40" id="tabBar-discover-active">
            <g fill="#1fa7ff"><path fill="#1fa7ff" d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"></path><path fill="#FFF" d="M12.79 28.126c-1.515.68-2.169.016-1.462-1.484l3.905-8.284c.47-.999 1.665-2.198 2.66-2.675l8.484-4.064c1.497-.717 2.153-.08 1.46 1.435l-3.953 8.64c-.46 1.006-1.647 2.186-2.655 2.64l-8.44 3.792z"></path><path fill="#1fa7ff" d="M6.482 5.44c-.684-.294-.678-.764 0-1.055L11.54 2.45c.517-.198.936.085.936.65v3.625c0 .558-.412.852-.936.65L6.48 5.44z" transform="rotate(-45 34.258 3.92)"></path></g>
          </symbol>
          <symbol viewBox="0 0 38 38" id="tabBar-order">
            <g fill="none"><g stroke="#666" strokeWidth="2"><rect stroke="#666" strokeWidth="2" width="38" height="38" rx="2"></rect></g><rect width="24" height="2" x="7" y="8" fill="#666" rx="1"></rect><rect width="20" height="2" x="7" y="17" fill="#666" rx="1"></rect><rect width="8" height="2" x="7" y="26" fill="#666" rx="1"></rect></g>
          </symbol>
          <symbol viewBox="0 0 38 38" id="tabBar-order-active">
            <g fill="#1fa7ff"><g stroke="#1fa7ff" strokeWidth="2"><rect width="38" height="38" rx="2"></rect></g><rect width="24" height="2" x="7" y="8" fill="#fff" rx="1"></rect><rect width="20" height="2" x="7" y="17" fill="#fff" rx="1"></rect><rect width="8" height="2" x="7" y="26" fill="#fff" rx="1"></rect></g>
          </symbol>
          <symbol viewBox="0 0 38 38" id="tabBar-user">
            <g fill="none" stroke="#666" strokeWidth="2"><g><path d="M10 11.833V8.999A8.999 8.999 0 0 1 19 0c4.97 0 9 4.04 9 8.999v2.834l-.013.191C27.657 16.981 23.367 21 19 21c-4.616 0-8.64-4.02-8.987-8.976L10 11.833z"></path></g><g><path d="M0 32.675C0 26.763 10.139 22 19.027 22 27.916 22 38 26.763 38 32.757v3.312C38 37.136 37.098 38 35.997 38H2.003C.897 38 0 37.137 0 36.037v-3.362z"></path></g></g>
          </symbol>
          <symbol viewBox="0 0 38 38" id="tabBar-user-active">
            <g fill="#1fa7ff" stroke="#1fa7ff" strokeWidth="2"><g><path d="M10 11.833V8.999A8.999 8.999 0 0 1 19 0c4.97 0 9 4.04 9 8.999v2.834l-.013.191C27.657 16.981 23.367 21 19 21c-4.616 0-8.64-4.02-8.987-8.976L10 11.833z"></path></g><g><path d="M0 32.675C0 26.763 10.139 22 19.027 22 27.916 22 38 26.763 38 32.757v3.312C38 37.136 37.098 38 35.997 38H2.003C.897 38 0 37.137 0 36.037v-3.362z"></path></g></g>
          </symbol>
        </defs>
        <defs>
          <filter id="mask-blur">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <symbol viewBox="0 0 44 44" id="cart-add">
          <path fill="none" d="M0 0h44v44H0z"></path>
          <path fillRule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z"></path>
        </symbol>
        <symbol viewBox="0 0 44 44" id="cart-minus">
          <path fillRule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z"></path><path fillRule="evenodd" d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z"></path>
        </symbol>
        <symbol viewBox="0 0 1024 1024" id="score-star">
        <path d="M511.398296 61.144592 657.44251 357.063255 984.00817 404.51601 747.703233 634.857119 803.487747 960.102714 511.398296 806.542316 219.308845 960.102714 275.093359 634.857119 38.788421 404.51601 365.354082 357.063255Z"></path>
        </symbol>
      </svg>
    )
  }
}

export default SvgIcon