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

export function formatDateWithTime (dateString:string) {
  const date = new Date(dateString);
  const now = new Date();

  // Check if the date is today
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return 'Today ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Check if the date is yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Yesterday ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Otherwise, return the date in the specified format
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

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
