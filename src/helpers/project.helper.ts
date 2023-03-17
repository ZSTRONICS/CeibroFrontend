import { dataInterface } from "components/Utills/Inputs/SelectDropdown";
import {
  RoleInterface,
} from "constants/interfaces/project.interface";

export function formatDate(date: any) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function mapGroups(groups: any) {
  return groups?.map((list: any) => ({
    label: list.name,
    value: list._id,
  }));
}

export function mapRoles(roles: RoleInterface[]): dataInterface[] {
  return roles?.map((role: RoleInterface) => ({
    label: role.name || "",
    value: role._id || "",
  }));
}

export function checkRolePermission(
  permissions: any,
  permissionToCheck: string
) {
  if (permissions?.admin) {
    return true;
  }
  return permissions?.roles?.includes?.(permissionToCheck);
}

export function checkMemberPermission(
  permissions: any,
  permissionToCheck: string
) {
  if (permissions?.admin) {
    return true;
  }
  return permissions?.member?.includes?.(permissionToCheck);
}
export function checkTimeProfilePermission(
  permissions: any,
  permissionToCheck: string
) {
  if (permissions?.admin) {
    return true;
  }
  return permissions?.timeProfile?.includes?.(permissionToCheck);
}
