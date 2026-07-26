import Genders from '../enum/genders.enum'

interface Currency {
    singular: string
    plural: string
    gender: Genders
    subunit: {
        singular: string
        plural: string
        gender: Genders
    }
}

export default Currency
