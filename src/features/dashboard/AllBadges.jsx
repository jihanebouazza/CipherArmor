import { HiOutlineEllipsisHorizontal } from "react-icons/hi2"
import Modal from "../../ui/Modal"
import BadgeGallery from "./BadgeGallery"

function AllBadges() {
  return (
    <Modal>
    <Modal.Open opens="all-badges">
      <button title="View all">
        <HiOutlineEllipsisHorizontal
          className="dark:text-charcoal-200 text-charcoal-700 cursor-pointer"
          size={22}
        />
      </button>
    </Modal.Open>
    <Modal.Window name="all-badges">
      <BadgeGallery />
    </Modal.Window>
  </Modal>
  )
}

export default AllBadges