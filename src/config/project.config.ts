import colors from "../assets/colors";

interface ColorCodes {
    [key: string]: string
}

const colorsByStatus: ColorCodes = {
    all: colors.white,
    ongoing: colors.darkYellow,
    approved: colors.primary,
    completed: colors.mediumGrey,
    draft: colors.lightBlack
}

const textColorsByStatus: ColorCodes  = {
    all: colors.black,
    ongoing: colors.white,
    approved: colors.white,
    completed: colors.white,
    draft: colors.white,
}


export function getColorByStatus(status: string ): string {
    return colorsByStatus[status.toLowerCase()]
}

export function getTextColorByStatus(status: string): string {
    return textColorsByStatus[status.toLowerCase()]
}

export function getAllStatus() {
    return [
        {
            title: 'All',
            count: 0
        },
        {
            title: 'Ongoing',
            count: 1
        },
        {
            title: 'Approved',
            count: 0
        },
        {
            title: 'Done',
            count: 1
        },
        {
            title: 'Draft',
            count: 1
        }
    ]

}