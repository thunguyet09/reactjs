import { faCaretUp, faChartSimple, faClipboardList, faCommentDots, faCubes, faEye, faFile, faGear, faRepeat, faSortDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const menuItem = [
    {
        path: "/dashboard",
        name: "Tổng quan",
        icon: <FontAwesomeIcon icon={faEye} />
    },

    {
        path: "/analyze",
        name: "Phân tích",
        icon: <FontAwesomeIcon icon={faChartSimple} />
    },

    {
        path: "/report",
        name: "Báo cáo",
        icon: <FontAwesomeIcon icon={faFile} />,
        iconClosed: <FontAwesomeIcon icon={faSortDown} />,
        iconOpened: <FontAwesomeIcon icon={faCaretUp} />,

        subNav: [
            {
                path: "/report",
                name: "Báo cáo 1",
                icon: <FontAwesomeIcon icon={faFile} />,
            },

            {
                path: "/report",
                name: "Báo cáo 2",
                icon: <FontAwesomeIcon icon={faFile} />,
            },

            {
                path: "/report",
                name: "Báo cáo 3",
                icon: <FontAwesomeIcon icon={faFile} />,
            }
        ]
    },

    {
        path: "/product",
        name: "Sản phẩm",
        icon: <FontAwesomeIcon icon={faCubes} />
    },

    {
        path: "/user",
        name: "Người dùng",
        icon: <FontAwesomeIcon icon={faUser} />
    },

    {
        path: "/comment",
        name: "Bình luận",
        icon: <FontAwesomeIcon icon={faCommentDots} />
    },

    {
        path: "/transaction",
        name: "Giao dịch",
        icon: <FontAwesomeIcon icon={faRepeat} />,
        iconClosed: <FontAwesomeIcon icon={faSortDown} />,
        iconOpened: <FontAwesomeIcon icon={faCaretUp} />,

        subNav: [
            {
                path: "/order",
                name: "Hóa đơn",
                icon: <FontAwesomeIcon icon={faClipboardList} />
            }
        ]
    },

    {
        path: "/setting",
        name: "Cài đặt",
        icon: <FontAwesomeIcon icon={faGear} />
    }
]