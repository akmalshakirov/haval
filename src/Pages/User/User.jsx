import { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Dropdown,
    Form,
    Image,
    Input,
    Layout,
    Menu,
    message,
    Modal,
    Table,
    Upload,
} from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import GWM_wingle_7 from "../../Images/gwm-wingle-7.jpg";
import UserImage from "../../Images/userimage.png";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const UserPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    useEffect(() => {
        document.title = "Haval | Shaxsiy kabinet";
        const token = localStorage.getItem("token");
        if (!token) {
            localStorage.removeItem("token");
            navigate("/login");
            message.info("Oldin login qiling!");
        }
    });
    const [contracts, setContracts] = useState([
        {
            id: 1,
            image: GWM_wingle_7,
            title: "Avtomobil shartnomasi 1",
            startDate: "2023-03-01",
            endDate: "2023-03-08",
            status: "Kutilmoqda",
            className: "pending",
        },
        {
            id: 2,
            image: GWM_wingle_7,
            title: "Avtomobil shartnomasi 2",
            startDate: "2023-03-05",
            endDate: "2023-03-12",
            status: "Aktiv",
            className: "active",
        },
        {
            id: 3,
            image: GWM_wingle_7,
            title: "Avtomobil shartnomasi 3",
            startDate: "2023-03-05",
            endDate: "2023-03-12",
            status: "Bekor qilingan",
            className: "canceled",
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleAddContract = (values) => {
        const newContract = {
            id: contracts.length + 1,
            image: null,
            title: values.title,
            startDate: "2023-03-10",
            endDate: "2023-03-17",
        };
        setContracts([...contracts, newContract]);
        form.resetFields();
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: "Rasm",
            dataIndex: "image",
            key: "image",
            render: (image) => <Image width={100} src={image} />,
            width: 70,
        },
        {
            title: "Shartnoma nomi",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Olingan sana",
            dataIndex: "startDate",
            key: "startDate",
        },
        {
            title: "Amal qilish muddati",
            dataIndex: "endDate",
            key: "endDate",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
    ];

    const menuItems = [
        {
            key: "1",
            icon: <FileTextOutlined />,
            label: "Shartnomalarim",
        },
    ];

    const profileMenuItems = [
        {
            key: "edit",
            label: "Profilni tahrirlash",
        },
        {
            key: "logout",
            label: "Tizimdan chiqish",
        },
    ];

    const handleProfileMenuClick = (info) => {
        if (info.key === "edit") {
            // setIsEditModalOpen(!isEditModalOpen);
            navigate("/user/edit-profile");
        } else if (info.key === "logout") {
            localStorage.removeItem("token");
            message.success("Tizimdan chiqildi");
            navigate("/");
        }
    };

    // const fetchUser = async () => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             message.error("Token topilmadi, qayta tizimga kiring!");
    //             return;
    //         }

    //         const response = await axios.get("http://localhost:3000/users", {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         setUser([response.data]);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchUser();
    // }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible>
                <Menu
                    theme='dark'
                    defaultSelectedKeys={["1"]}
                    mode='inline'
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <div>
                        <ul style={{ display: "flex", gap: 10 }}>
                            <li>
                                <Link
                                    className='hovered'
                                    to='/'
                                    style={{
                                        color: "#00000090",
                                    }}>
                                    Bosh sahifa
                                </Link>
                            </li>
                            <span>{">"}</span>
                            <li>
                                <Link to='/user' className='hovered'>
                                    Shaxsiy kabinet
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div></div>
                    <Dropdown
                        menu={{
                            items: profileMenuItems,
                            onClick: handleProfileMenuClick,
                        }}
                        trigger={["click"]}>
                        <Avatar
                            style={{
                                cursor: "pointer",
                                border: "1px solid #212121",
                                backgroundColor: "transparent",
                            }}
                            src={UserImage}
                        />
                    </Dropdown>
                </Header>
                <Content style={{ margin: "16px" }}>
                    <Button
                        type='primary'
                        onClick={() => setIsModalVisible(!isModalVisible)}
                        style={{ marginBottom: 16 }}>
                        Shartnoma qo'shish
                    </Button>
                    <Table dataSource={contracts} columns={columns} />
                </Content>
            </Layout>
            {/* MODALS */}
            {/* <Modal
                title='Profilni tahrirlash'
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(!isEditModalOpen)}
                onOk={() => setIsEditModalOpen(!isEditModalOpen)}>
                <Input />
            </Modal> */}

            {/*Shartnoma qoshish */}
            <Modal
                title="Yangi shartnoma qo'shish"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={handleAddContract}>
                    <Form.Item
                        name='title'
                        label='Shartnoma nomi'
                        rules={[
                            {
                                required: true,
                                message: "shartnoma nomini kiriting!",
                            },
                        ]}>
                        <Input placeholder='Shartnoma nomi' />
                    </Form.Item>
                    <Form.Item>
                        <Upload />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Qo'shish
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default UserPage;
