import {
  Box,
  Link,
  useDisclosure,
  Stack,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
import DeskTopNav from "./DeskTopNav";
import { AiOutlineClose } from "react-icons/ai";
import MobileNav from "./MobileNav";
import { IoIosMenu } from "react-icons/io";
import { Logo } from "../UI/Logo";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Box
      pos={"fixed"}
      zIndex={100}
      w={"100%"}
      h={"103px"}
      backgroundColor={"#F0E6F0"}
    >
      <div className="h-[100px] flex mx-4 md:mx-8 justify-between items-center bg-[transparent]">
        <Link href="/" cursor={"pointer"}>
          <Logo onClick={() => navigate("/")} />
        </Link>

        <div className="hidden md:block">
          <DeskTopNav />
        </div>

        <div className="block md:hidden">
          <IconButton
            display={{ base: "flex", xl: "none" }}
            onClick={onToggle}
            _hover={{ bg: "transparent" }}
            color={"#fff"}
            icon={
              isOpen ? (
                <AiOutlineClose
                  size="1.5rem"
                  onClick={onClose}
                  style={{ color: "#15265E" }}
                />
              ) : (
                <IoIosMenu fontSize="2rem" style={{ color: "#15265E" }} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </div>
      </div>
      <Collapse in={isOpen} style={{ zIndex: 5 }}>
        <Stack
          mt={"0rem"}
          color="white"
          bg="teal.500"
          display={{ xl: "none" }}
          shadow="md"
          onClick={onClose}
        >
          <MobileNav />
        </Stack>
      </Collapse>
    </Box>
  );
};

export default Header;
