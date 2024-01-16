type SupportURLprops = {
  label: string;
};

export default function SupportURL({ label }: SupportURLprops) {
  return <a href="#">{label}</a>;
}
