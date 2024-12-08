import React from "react";
import { Menu, Container, Button, Image } from "semantic-ui-react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../asset/react.svg";

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <Menu inverted borderless style={{ padding: "o.3rem", marginBottom: "20px" }} attached>
            <Container>
                <Menu.Item name="home">
                    <Link to="/">
                    <Image size="mini" src={logo} alt="logo" />
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <h2>Admin-Final</h2>
                </Menu.Item>
                <Menu.Item>
                <Button size="mini" primary onClick={() => navigate("/viewBanner")}>
                        View Banner
                    </Button>
                </Menu.Item>
                <Menu.Item>
                <Button size="mini" primary onClick={() => navigate("/viewCategory")}>
                        View Category
                </Button>
                </Menu.Item>
                <Menu.Item>
                <Button size="mini" primary onClick={() => navigate("/viewReview")}>
                        Review
                </Button>
                </Menu.Item>
                <Menu.Item>
                <Button size="mini" primary onClick={() => navigate("/viewItem")}>
                        View Item
                </Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar