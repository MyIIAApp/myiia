export enum MembershipProfileStatus {
    NewMembership = 0,
    SavedMembershipProfile = 1,
    SubmittedMembershipProfile = 2,
    RejectedMembershipProfile = 3,
    ApprovedMembershipProfile = 4,
    ActiveMembership = 5,
    ActiveGraceMembership = 6,
    ExpiredMembership = 7
}
export enum MembershipCardStatus {
    ACTIVE = 5,
    GRACE = 6,
    EXPIRED = 7,
}
export const MembershipStatus = "MembershipStatus"
export const SubmitMembershipDisplayMessage = "Thanks for Your Submission. Your Request is under process. IIA Admin will get back to you."
export const RejectedMembershipDisplayMessage = "Your Application has been rejected. Please contact Admin for details."
export const ApprovedMembershipDisplayMessage = "Your Application is Approved."