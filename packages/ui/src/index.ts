// Utilities
export { cn } from './lib/utils';

// Basic Components
export { Button, buttonVariants, type ButtonProps } from './components/button';
export { Input, type InputProps } from './components/input';
export { Label } from './components/label';
export { Textarea } from './components/textarea';
export { Badge, badgeVariants } from './components/badge';
export { Checkbox } from './components/checkbox';
export { Switch } from './components/switch';
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from './components/select';
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/card';
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/dialog';
export { Separator } from './components/separator';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/tabs';
export { Avatar, AvatarImage, AvatarFallback } from './components/avatar';
export { Calendar } from './components/calendar';
export { Popover, PopoverTrigger, PopoverContent } from './components/popover';
export { Skeleton } from './components/skeleton';
export { ScrollArea, ScrollBar } from './components/scroll-area';

// Company Structure Components
export {
  CompanyStructure,
  DepartmentNode,
  EmployeeList,
  OrgChart,
  StatusBadge,
  type CompanyStructureProps,
  type Department,
  type DepartmentEmployee,
} from './components/company-structure';

// Employee Components
export {
  EmployeeCard,
  EmployeeAvatar,
  EmployeeGrid,
  statusConfig as employeeStatusConfig,
  employmentTypeLabels,
  type EmployeeCardProps,
  type EmployeeAvatarProps,
  type EmployeeGridProps,
  type Employee,
} from './components/employee-card';

// KPI Components
export {
  KPICard,
  KPIGrid,
  KPISummary,
  EmployeeKPIRow,
  KPILeaderboard,
  StatusIcon as KPIStatusIcon,
  type KPICardProps,
  type KPIGridProps,
  type KPISummaryProps,
  type KPIMetric,
  type KPIEmployee,
} from './components/kpi-widget';

// Role & Permissions Components
export {
  RolePermissions,
  RoleCard,
  RolesList,
  PermissionBadge,
  defaultModules,
  permissionLabels,
  type RolePermissionsProps,
  type RoleCardProps,
  type RolesListProps,
  type PermissionModule,
  type Permission,
  type Role,
} from './components/role-permissions';

// Re-export useful dependencies
export { cva, type VariantProps } from 'class-variance-authority';
export { clsx } from 'clsx';
