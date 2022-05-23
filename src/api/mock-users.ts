import khmerGenerator from "khmer-name-generator"

import { User, UserRole } from "typings/api-model"
import { getRandomInt } from "utils/number-utils"

import { mock } from "./_api"

let idCounter = 1
const getUserId = () => idCounter++

const getRandomRoles = () => {
  const roles = [UserRole.ADMIN, UserRole.LIBRARIAN, UserRole.CUSTOMER]
  return roles[getRandomInt(0, roles.length - 1)]
}

const users: User[] = [
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/1.jpg",
    email: "Monte.Auer31@yahoo.com",
    address: "Gislasonchester",
    role: getRandomRoles(),
    description:
      "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem quam pede lobortis ligula, sit amet eleifend.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/2.jpg",
    email: "Francis64@gmail.com",
    address: "Flaviomouth",
    role: getRandomRoles(),
    description:
      "Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/3.jpg",
    email: "Alexys.Frami91@hotmail.com",
    address: "Derekmouth",
    role: getRandomRoles(),
    description:
      "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/4.jpg",
    email: "Susan_Wolff@hotmail.com",
    address: "Josieview",
    role: getRandomRoles(),
    description: "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/5.jpg",
    email: "Demetris88@hotmail.com",
    address: "East Alexander",
    role: getRandomRoles(),
    description:
      "Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/1.jpg",
    email: "Elissa.Ortiz50@hotmail.com",
    address: "Gaetanoside",
    role: getRandomRoles(),
    description:
      "Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/2.jpg",
    email: "Amaya53@yahoo.com",
    address: "Reginaldbury",
    role: getRandomRoles(),
    description: "Vivamus tortor. Duis mattis egestas metus.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/3.jpg",
    email: "Amari.Gaylord42@hotmail.com",
    address: "East Bill",
    role: getRandomRoles(),
    description:
      "Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/4.jpg",
    email: "Shaina.Beahan@yahoo.com",
    address: "Zboncakchester",
    role: getRandomRoles(),
    description:
      "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/5.jpg",
    email: "Yadira68@gmail.com",
    address: "Murphyberg",
    role: getRandomRoles(),
    description:
      "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/1.jpg",
    email: "Alexandro_Marquardt@yahoo.com",
    address: "Grantmouth",
    role: getRandomRoles(),
    description:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/2.jpg",
    email: "Mckayla12@yahoo.com",
    address: "Port Royce",
    role: getRandomRoles(),
    description:
      "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/3.jpg",
    email: "Katheryn.Casper89@yahoo.com",
    address: "South Creola",
    role: getRandomRoles(),
    description:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/4.jpg",
    email: "Alysha27@yahoo.com",
    address: "Mayerburgh",
    role: getRandomRoles(),
    description:
      "Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/5.jpg",
    email: "Scot.Koch@gmail.com",
    address: "Metamouth",
    role: getRandomRoles(),
    description:
      "Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/1.jpg",
    email: "Cameron.Kuphal50@hotmail.com",
    address: "Jayneberg",
    role: getRandomRoles(),
    description:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/2.jpg",
    email: "Buddy96@gmail.com",
    address: "Lakinburgh",
    role: getRandomRoles(),
    description:
      "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/3.jpg",
    email: "Tommie.Predovic6@gmail.com",
    address: "West Carmellamouth",
    role: getRandomRoles(),
    description:
      "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/4.jpg",
    email: "Reymundo_Gleichner@hotmail.com",
    address: "West Ernestview",
    role: getRandomRoles(),
    description:
      "Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.",
  },
  {
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    avatar: "/mock-assets/user-avatars/5.jpg",
    email: "Queen73@yahoo.com",
    address: "Wizaville",
    role: getRandomRoles(),
    description:
      "Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.",
  },
]

mock.onGet("/api/v1/users").reply((config) => {
  const role = config.params.role as UserRole | "all"

  let userResult: User[] = users
  if (role && role !== "all") {
    userResult = users.filter((user) => user.role === role)
  }

  return [200, userResult.slice(0, 10)]
})

mock.onGet("/api/v1/users/:id").reply((config) => {
  const { id } = config.params
  const user = users.find((user) => user.id === +id)

  return [200, user]
})
