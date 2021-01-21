import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginForms from '../Components/Login/LoginForms';
import firebase from '../Firebase'

const Login = () => {
    const [user, loading, error] = useAuthState(firebase.auth());

    return (
        <>
            {loading && <span>Loading . . .</span>}
            {error && <span>Error</span>}
            {!user &&
                <div className="flex">
                    <svg className="h-screen" width="765" height="768" viewBox="0 0 765 768" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M175.358 -72.1374C80.6236 -98.9717 -0.3533 -8.21606 -29 40.516V862H746.959C745.96 844.49 785.968 747.012 746.959 513.281C689 166 572.451 289.412 501.5 166C430.549 42.5875 293.775 -38.5945 175.358 -72.1374Z" fill="#A3D8F4" fillOpacity="0.8" />
                        <g clipPath="url(#clip0)">
                            <path d="M338.743 411.412L326.465 365.588C324.912 359.793 318.934 356.341 313.139 357.894L178.909 393.861C173.117 395.413 169.665 401.391 171.218 407.186L183.496 453.01C185.049 458.805 191.028 462.257 196.819 460.705L331.05 424.738C336.844 423.185 340.296 417.207 338.743 411.412ZM326.948 413.486L194.748 448.909L183.014 405.115L315.211 369.693L326.945 413.487L326.948 413.486Z" fill="#FF0000" />
                            <path d="M336.944 608.139C339.018 615.877 347.001 620.489 354.742 618.415L366.734 615.202C374.472 613.128 379.083 605.142 377.01 597.403L361.837 540.778C359.764 533.04 351.777 528.429 344.039 530.503L332.047 533.716C324.306 535.79 319.698 543.776 321.772 551.514L336.944 608.139ZM333.295 548.426C332.924 547.041 333.75 545.611 335.135 545.239L347.127 542.026C348.512 541.655 349.942 542.48 350.314 543.866L365.486 600.491C365.857 601.874 365.031 603.304 363.645 603.675L351.654 606.888C350.268 607.259 348.838 606.434 348.468 605.051L333.295 548.426Z" fill="#00FF57" />
                            <path d="M382.68 397.633C385.862 396.78 387.74 393.468 386.887 390.286L372.713 337.389C370.879 330.544 363.817 326.467 356.972 328.301L347.378 330.872L343.089 314.867C340.548 305.383 330.766 299.733 321.279 302.275L292.365 310.023L278.98 260.068C278.02 256.487 275.523 251.916 272 250.5L264 246.5C258.767 244.401 253.483 246.066 250 250.5L246.5 251C243.541 252.11 241.796 252.8 241.5 252.68L237.5 253.5C232.266 251.398 226.483 253.066 223 257.5L219.5 258.648C219.301 258.901 215.299 260.119 215 260L209 261.5C203.765 259.395 197.98 261.232 194.498 265.669L194.498 266C195.473 264.756 189.059 267.136 188.76 267.017L179.5 269.718C174.266 267.617 169.979 268.564 166.5 273L161.5 280.206C159.157 283.193 158.619 288.48 159.577 292.059L172.963 342.016L144.05 349.763C134.566 352.305 128.916 362.09 131.457 371.574L168.376 509.355C168.431 509.562 168.5 509.769 168.576 509.97L189.544 563.953C190.737 567.025 194.151 568.607 197.215 567.42C200.287 566.227 201.859 562.704 200.666 559.632L179.818 505.952L142.985 368.488C142.146 365.357 144.01 362.128 147.141 361.289L158.131 358.345L163.397 377.996C164.588 382.444 169.179 385.095 173.627 383.903L243.182 365.265L312.737 346.628C317.185 345.436 319.835 340.846 318.643 336.398L313.378 316.746L324.367 313.802C327.499 312.963 330.727 314.827 331.566 317.958L368.4 455.422L393.012 614.895C393.471 617.865 391.631 620.692 388.727 621.47L245.238 659.917C242.337 660.695 239.325 659.168 238.239 656.366L200.666 559.632C199.473 556.56 196.018 555.036 192.947 556.232C189.875 557.425 188.351 560.881 189.544 563.953L227.117 660.687C230.414 669.175 239.531 673.797 248.326 671.441L391.812 632.994C400.606 630.638 406.194 622.074 404.805 613.076L401.355 590.722L412.426 587.756C418.727 586.068 422.765 579.926 421.817 573.471L404.649 456.732C404.615 456.506 404.57 456.28 404.51 456.056L386.887 390.286C386.035 387.106 382.764 385.215 379.581 386.068C376.396 386.921 374.508 390.195 375.36 393.374L392.894 458.811L410.011 575.207C410.081 575.67 409.791 576.111 409.341 576.232L399.524 578.862L380.142 453.282C380.11 453.068 380.063 452.856 380.008 452.649L350.465 342.395L360.06 339.824C360.549 339.693 361.056 339.989 361.187 340.477L375.36 393.374C376.213 396.556 379.495 398.486 382.68 397.633ZM180.394 369.735L173.993 371.45L169.654 355.257L176.055 353.542L180.394 369.735ZM288.269 340.83L191.918 366.648L171.138 289.096C171.141 289.095 171.143 289.092 171.148 289.087L176.92 281.725C177.119 281.472 177.587 281.347 177.886 281.466L185.5 279C193.5 275.5 194 275.5 199 273.5L202.5 272.5C202.696 272.248 205.704 271.38 206 271.5L211 270C219 267.273 219.5 267.942 225 265.669L230 264C232.5 262.712 236.5 262.5 237 261L241.118 259.897C248.118 257.397 244.5 258.5 251 256.5L256 257C256.196 256.748 259.704 258.528 260 258.648L267.492 263.288L288.269 340.83ZM306.193 336.028L299.792 337.743L295.453 321.549L301.854 319.834L306.193 336.028Z" fill="#0C0C0C" />
                            <path d="M252.302 278.829L192.602 294.825C188.016 296.054 184.994 299.647 185.851 302.847C186.709 306.048 191.121 307.645 195.708 306.416L255.408 290.42C259.995 289.191 263.017 285.601 262.16 282.401C261.302 279.201 256.889 277.6 252.302 278.829Z" fill="black" />
                            <path d="M258.514 302.011L198.814 318.008C194.227 319.237 191.205 322.827 192.063 326.028C192.92 329.229 197.333 330.828 201.919 329.599L261.62 313.602C266.206 312.373 269.229 308.782 268.371 305.581C267.513 302.38 263.1 300.782 258.514 302.011Z" fill="black" />
                            <path d="M264.467 324.227L204.766 340.224C200.18 341.453 197.158 345.043 198.015 348.244C198.873 351.445 203.286 353.044 207.872 351.815L267.573 335.818C272.159 334.589 275.181 330.999 274.323 327.798C273.466 324.597 269.053 322.998 264.467 324.227Z" fill="black" />
                            <rect x="206.479" y="476.422" width="31" height="31" rx="3" transform="rotate(-15 206.479 476.422)" fill="white" stroke="black" strokeWidth="4" />
                            <rect x="218.384" y="520.854" width="31" height="31" rx="3" transform="rotate(-15 218.384 520.854)" fill="white" stroke="black" strokeWidth="4" />
                            <rect x="230.549" y="566.253" width="31" height="31" rx="3" transform="rotate(-15 230.549 566.253)" fill="white" stroke="black" strokeWidth="4" />
                            <rect x="242.713" y="611.651" width="31" height="31" rx="3" transform="rotate(-15 242.713 611.651)" fill="white" stroke="black" strokeWidth="4" />
                            <rect x="253.809" y="463.739" width="31" height="31" rx="3" transform="rotate(-15 253.809 463.739)" fill="white" stroke="black" strokeWidth="4" />
                            <rect x="265.715" y="508.172" width="31" height="31" rx="3" transform="rotate(-15 265.715 508.172)" fill="white" stroke="black" strokeWidth="4" />
                            <rect x="277.879" y="553.571" width="31" height="31" rx="3" transform="rotate(-15 277.879 553.571)" fill="white" stroke="black" strokeWidth="4" />
                            <rect x="290.043" y="598.969" width="31" height="31" rx="3" transform="rotate(-15 290.043 598.969)" fill="white" stroke="black" strokeWidth="4" />
                            <rect x="301.139" y="451.057" width="31" height="31" rx="3" transform="rotate(-15 301.139 451.057)" fill="white" stroke="black" strokeWidth="4" />
                            <rect x="313.045" y="495.49" width="31" height="31" rx="3" transform="rotate(-15 313.045 495.49)" fill="white" stroke="black" strokeWidth="4" />
                        </g>
                        <circle cx="34.5" cy="32.5" r="74.5" fill="#B9FFFC" />
                        <circle cx="34.5" cy="32.5" r="74.5" fill="#B9FFFC" />
                        <circle cx="673.5" cy="768.5" r="74.5" fill="#B9FFFC" />
                        <circle cx="-0.5" cy="777.5" r="74.5" fill="#B9FFFC" />
                        <defs>
                            <clipPath id="clip0">
                                <rect width="407" height="407" fill="white" transform="translate(29.2644 309.604) rotate(-15)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <LoginForms error={error} />
                </div>
            }
            {user && 
                <div>
                    {user.displayName}
                    {user.email}
                    {user.photoURL}
                    {user.uid}
                </div>
            }
        </>
    )
}

export default Login
